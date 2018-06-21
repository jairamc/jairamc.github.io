---
title: Install ArchLinux with Disk Encryption
author: Jairam
layout: post
github_comments_issueid: "1"
categories:
  - Technology
tags:
  - archlinux
  - linux
  - installation-guides
  - gnome
---

To jump straight to the installation steps go to [Installation](#installation).

## Background
---

So the other day I decided to finally take the plunge and install [ArchLinux][arch]. I have never really been
a "disto-hopper". For the most part, I stuck with Ubuntu. Which to be fair served me pretty well. 

A few years ago, I made the switch to OSX. And for a while, it was all nice and shiny. But after about 4 years of using
OSX, I started to feel that there was a lot about the internals of my machine that I did not understand. And that brings
us back to the main topic of this post - *Install Arch with Disk Encryption*.

## Why Arch?
---

It came down to one simple feeling - [Ubuntu][ubuntu] felt too easy. And that's a good thing! But I wanted a challenge.
So I read up on [ArchLinux][arch] for about a week and asked my friends who were [Arch][arch] users for their opinions.
And the more I read about it, the more I wanted to try it. By the way, I have never seen a better documentation than the
[Arch Wiki][archwiki]. I highly recommend that you give it a read, especially the [introduction](https://wiki.archlinux.org/index.php/Arch_Linux). Without much further ado, lets jump into the installation. 

## Installation
---

**Please Note**: This is just one way to install [ArchLinux][arch]. The beauty of [ArchLinux][arch] is that you can set
it up however you want. See the [Installation Guide](https://wiki.archlinux.org/index.php/Installation_guide) on the 
[Arch Wiki][archwiki].

Each of the section below starts with a link to the [Arch Wiki][archwiki] which has more details and further reading on
the step. 

### Disclaimer

This is not an original piece of work. I researched from a few different sources and am collating here the steps that
worked for me. Please see [references](#references) for the links I used as sources. 

### Installation Setup

This installation assumes the following setup:

- You have [UEFI](https://wiki.archlinux.org/index.php/Unified_Extensible_Firmware_Interface)
- You want [full disk encryption](https://wiki.archlinux.org/index.php/Disk_encryption)
  - Specifically set up [LVM on LUKS]( https://wiki.archlinux.org/index.php/Dm-crypt/Encrypting_an_entire_system#LVM_on_LUKS) using [dmcrypt](https://wiki.archlinux.org/index.php/Dm-crypt)
- You are not planning on keeping another OS on the machine
- You want to use [systemd-boot](https://wiki.archlinux.org/index.php/Systemd-boot) as your boot manager
- You want to use [GNOME](https://wiki.archlinux.org/index.php/GNOME) as your desktop environment 



### Step 1: Create a bootable USB disk

> [Getting & Installing Arch](https://wiki.archlinux.org/index.php/Category:Getting_and_installing_Arch)

> [USB Flash Installation Media](https://wiki.archlinux.org/index.php/USB_flash_installation_media)

- Download the current ISO image from the [download page](https://www.archlinux.org/download/) using a convenient method.
- Find out the name of your USB drive with `lsblk`. Make sure that it is not mounted.

```sh
sudo dd bs=4M if=/path/to/archlinux.iso of=/dev/sdx status=progress oflag=sync
```

### Step 2: Boot into the live media

Make sure to turn off [Secure Boot](https://wiki.archlinux.org/index.php/Secure_Boot). The boot files for [Arch][arch]
are not signed

### Step 3: Setup Environment

> [Installation setup](https://wiki.archlinux.org/index.php/Installation_guide#Pre-installation)

#### Load Keymap

```sh
loadkeys uk
```

#### Setup Wifi

Skip this step if you are on a wired connection. Otherwise:

```sh
# List your wifi device
iw dev

# setup wifi
wifi-menu -o <device name>
```

#### Setup NTP

```sh
timedatectl set-ntp true
```

#### Create Partitions

> [Partitioning](https://wiki.archlinux.org/index.php/Partitioning)

Use `lsblk` to find your HD/SSD. Lets say its `/dev/sdX`

```sh
cgdisk /dev/sdX

# 1. 512MB EFI partition # Hex code ef00
# 2. 100% size partiton # (to be encrypted) Hex code 8300
```

#### Format Partitions

```sh
mkfs.vfat -F32 /dev/sdX1
mkfs.ext4 /dev/sdX2
```

#### Create Encypted Volumes

> [Encryption](https://wiki.archlinux.org/index.php/Dm-crypt/Encrypting_an_entire_system#LVM_on_LUKS)

```sh
# Setup encryption
# aes - Encryption block cipher
# xts - Block cipher encryption mode
# plain64 - the initial vector is the 64-bit little-endian version of the sector number, padded with zeros if necessary.
cryptsetup -c aes-xts-plain64 -y --use-random luksFormat /dev/sdX2

# Open newly created encrypted block
cryptsetup luksOpen /dev/sdX2 cryptlvm

# Create encrypted partitions
# This creates one partions for root, modify if /home or other partitions should be on separate partitions
pvcreate /dev/mapper/cryptlvm
vgcreate vg0 /dev/mapper/cryptlvm
lvcreate --size 8G vg0 --name swap
lvcreate -l +100%FREE vg0 --name root

# Create filesystems on encrypted partitions
mkfs.ext4 /dev/mapper/vg0-root
mkswap /dev/mapper/vg0-swap
```

#### Mount Partitions

```sh
mount /dev/mapper/vg0-root /mnt # /mnt is the installed system
swapon /dev/mapper/vg0-swap
mkdir /mnt/boot
mount /dev/sdX1 /mnt/boot
```

### Step 4: Install OS

```sh
pacstrap /mnt base base-devel grub-efi-x86_64 zsh vim git efibootmgr dialog wpa_supplicant
```

*[This might take some time](https://xkcd.com/303/)*

### Step 5: Setup OS

#### Generate an fstab file

```sh
genfstab -U /mnt >> /mnt/etc/fstab
```

Its a good idea to check the contents of `/mnt/etc/fstab` at this point and make sure it looks all good. 

#### CHROOT into the new system

```sh
arch-chroot /mnt /bin/bash
```

#### Setup system clock

```sh
ln -sf /usr/share/zoneinfo/Europe/London /etc/localtime
hwclock --systohc
```

#### Setup Locale

Uncomment `en_GB.UTF-8 UTF-8` and other needed localizations in `/etc/locale.gen`, and generate them with:

```sh
locale-gen
```

Set the LANG variable in `/etc/locale.conf accordingly, for example:

```sh
echo LANG=en_GB.UTF-8 > /etc/locale.conf
```

Make your keyboard layout persistent

```sh
echo KEYMAP=uk > /etc/vconsole.conf
```

#### Setup Network Configuration

> [Networking](https://wiki.archlinux.org/index.php/Network_configuration)

Replace `MYHOSTNAME` with your hostname in the command below.

```sh
echo MYHOSTNAME > /etc/hostname
```

Add matching entries in `/etc/hosts`

```sh
127.0.0.1	localhost
::1		    localhost
127.0.1.1	MYHOSTNAME.localdomain	MYHOSTNAME
```

#### Setup User

At this point in the setup, you will be logged in as the `root` user. You should create a password for the `root` user.

```sh
passwd
```

You should also create a regular user.

```sh
# If you would like to use a different shell than `zsh` change appropriately
useradd -m -g users -G wheel -s /bin/zsh MYUSERNAME
passwd MYUSERNAME
```

#### Create a new `initramfs` image

> [Configuring mkinitcpio for encrypted device](https://wiki.archlinux.org/index.php/Dm-crypt/Encrypting_an_entire_system#Configuring_mkinitcpio_3)

Edit `/etc/mkinitcpio.conf`.

```sh
# Add ext4 to Modules
MODULES=(ext4)

# Edit the `HOOKS` line to look like this
HOOKS=(base udev autodetect keyboard keymap modconf block encrypt lvm2 resume filesystems fsck)
```

**NOTE**: It is important that you don't change the order of the `HOOKS` line as that is the order in which the kernel
modules will be loaded. 

Generate the image.

```sh
mkinitcpio -p linux
```

#### Configure bootloader

> [Configure bootloader](https://wiki.archlinux.org/index.php/Dm-crypt/Encrypting_an_entire_system#Configuring_the_boot_loader_2)

```sh
bootctl --path=/boot install
```

Create /boot/loader/entries/arch.conf.

```sh
title	Arch Linux
linux	/vmlinuz-linux
initrd	/initramfs-linux.img
options cryptdevice=UUID=<UUID for /dev/sdX2>:lvm:allow-discards resume=/dev/mapper/vg0-swap root=/dev/mapper/vg0-root rw quiet
```

You can get the UUID to your partition using `blkid` (might have to use sudo).

Edit `/boot/loader/loader.conf`.

```sh
timeout 0
default arch
editor 0
```

### Step 6: Finish installation and reboot into new system

```sh
exit
umount -R /mnt
reboot
```

At this point you have a base installation of [ArchLinux][arch]. Login you created a user account, use that, or 
simply use the `root` credentials. It is not recommended to stick with `root` credential for a prolonged period of time. 

### Step 7: Post Installation

In the following steps, you will have to use `sudo` if you are not the `root` user. 

#### Install PulseAudio Server

> [PulseAudio](https://wiki.archlinux.org/index.php/PulseAudio)

```sh
pacman -Su pulseaudio pulseaudio-alsa
```

#### Install GNOME

> [GNOME][gnome]

```sh
pacman -Su gnome
```

You can choose to install the `gnome-extra` package as well. See link above for details.

The above is sufficient if you are planning to run [GNOME][gnome] on 
[Wayland](https://wiki.archlinux.org/index.php/Wayland). However, if you want to use 
[Xorg](https://wiki.archlinux.org/index.php/Xorg) as your display server, you need install it. 

```sh
pacman -Su xorg
```

[GNOME][gnome] automatically installs [GDM](https://wiki.archlinux.org/index.php/GDM) as the display manager. You do
need to enable it in order for it to automatically start when you boot. 

```sh
systemctl enable gdm.server
```

#### Install NetworkManger

[GNOME][gnome] uses [NetworkManger](https://wiki.archlinux.org/index.php/NetworkManager) in order to detect and connect
to networks. While it is possible to use other tools for this purpose, [NetworkManager](https://wiki.archlinux.org/index.php/NetworkManager) is the most convenient. 

```sh
pacman -Su networkmanager
```

#### Optional Step: Install Firewall

```sh
pacman -Su ufw
```

And that's it. Just run `reboot` to restart your system. 

## References

- [Gist: Minimal instructions for installing arch linux on an UEFI system with full system encryption using dm-crypt and luks ](https://gist.github.com/mattiaslundberg/8620837)
- [Gist: Installing Arch Linux on an LUKS Encrypted root and booting from UEFI](https://gist.github.com/Thrilleratplay/93d57dbab36dc4304cd8)
- [Gist: Installing Arch with GPT, dm-crypt, LUKS, LVM and systemd-boot](https://gist.github.com/heppu/6e58b7a174803bc4c43da99642b6094b)
- [Gist: Efficient Encrypted UEFI-Booting Arch Installation](https://gist.github.com/HardenedArray/31915e3d73a4ae45adc0efa9ba458b07)
- All the [Arch Wiki][archwiki] links mentioned during the installation steps. 

[arch]:https://archlinux.org
[archwiki]:https://wiki.archlinux.org
[ubuntu]:https://www.ubuntu.com/
[gnome]:https://wiki.archlinux.org/index.php/GNOME