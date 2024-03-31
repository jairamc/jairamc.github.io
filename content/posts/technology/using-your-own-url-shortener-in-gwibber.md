---
author: Jairam
categories:
- Technology
date: "2011-10-01T00:00:00Z"
tags:
- gwibber
- tinyurl
- twitter
title: Using your own URL Shortener in Gwibber
---
{{< badge >}}
Obsolete Post
{{< /badge >}}

After starting to use my own URL shortner service (see (http://url.jairam.me)), the next thing I wanted to do was to try and get it integrated into Gwibber (see (http://www.gwibber.com)). Turns out its really simple to do it. I'll advice you to do this while Gwibber is not running.

**Assumptions**

  * This was tested on Ubuntu 11.04 and the instructions are meant to be for Ubuntu (Any Debian based distros should be similar)
  * The version of Gwibber this was tried against was 3.0.0.1.

### Step 1 : Create your protocol file

First of all, choose your URL shortner service. I will continue this example taking my own url shortner as example. To keep it secure I have obfuscated some parameter. If you want to use my service, just drop me an email or tweet. You are always welcome to use the web interface at <http://url.jairam.me> (I know the name is not creative. Suggestions are most welcome).

What you essentially need is a way of making an API call to your service. Once you know the format of the call, create a file, say urljairame.py, whose content should look like this -

```python
"""
 url.jairam.me interface for Gwibber
 jairamc (Jairam Chandar) - 2011-09-30
"""
import urllib2

PROTOCOL_INFO = {
  "name": "url.jairam.me",
  "version": 0.1,
  "fqdn" : "http://url.jairam.me",
}

class URLShorter:
  def short(self, text):
    short = urllib2.urlopen("http://url.jairam.me/yourls-api.php?signature=xxxxxxxxxx&action=shorturl&format=simple&url=%s" % urllib2.quote(text)).read()
    return short
```

The main line to notice is line number 15. Replace the text inside quotes with a suitable API call for the service you want and save this file. For instance, if you wanted to create a _bit.ly_ service for Gwibber (currently not supported), here is an example (of course there is a little more voodoo involved with the bit.ly api) -

```
http://api.bitly.com/v3/shorten?login=bitlyapidemo&apiKey=R_0da49e0a9118ff35f52f629d2d71bf07&longUrl=http%3A%2F%2Fbetaworks.com%2F&format=txt
```

### Step 2 : Place the URL protocol in correct location

Copy the above protocol file to `/usr/share/pyshared/gwibber/microblog/urlshorter/` and then create a symlink to it from /usr/lib/python2.7/dist-packages/gwibber/microblog/urlshorter`. Your version of python installed might be different.

```sh
sudo mv urljairamme.py /usr/share/pyshared/gwibber/microblog/urlshorter/"

sudo ln -s /usr/share/pyshared/gwibber/microblog/urlshorter/urljairamme.py /usr/lib/python2.7/dist-packages/gwibber/microblog/urlshorter/urljairamme.py
```

### Step 3 : Make Gwibber aware of your protocol file

Edit the \_\_init\_\_.py file (see location below) and add your new URL shortner service.

```sh
sudo vi /usr/lib/python2.7/dist-packages/gwibber/microblog/urlshorter/__init__.py
```

The file should look like this -

``` python
   import cligs, isgd, tinyurlcom, ur1ca, urljairamme
   #import snipurlcom, zima

   PROTOCOLS = {
     "cli.gs": cligs,
     "is.gd": isgd,
     #"snipurl.com": snipurlcom,
     "tinyurl.com": tinyurlcom,
     "ur1.ca": ur1ca,
     "url.jairam.me": urljairamme,
     #"zi.ma": zima,
   }
```

Notice lines 1 and 10. These are the new/edited lines in the file for the new service.

###  Step 4 : Change preferences in Gwibber to the new URL shortner service

  1. Open Gwibber
  2. Edit -> Preferences -> Messages -> Advanced -> Select the new service


And you are done.
