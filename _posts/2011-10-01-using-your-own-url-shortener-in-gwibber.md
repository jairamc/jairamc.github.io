---
title: Using your own URL Shortener in Gwibber
author: Jairam
layout: post
permalink: /2011/10/using-your-own-url-shortener-in-gwibber/
yourls_tweeted:
  - 1
  - 1
yourls_shorturl:
  - http://url.jairam.me/20
  - http://url.jairam.me/20
original_post_id:
  - 227
  - 227
categories:
  - Technology
tags:
  - bit.ly
  - Gwibber
  - tinyurl
  - twitter
  - URL
  - URL Shortner
  - url.jairam.me
---
After starting to use my own URL shortner service (see <http://url.jairam.me>), the next thing I wanted to do was to try and get it integrated into Gwibber (see <http://www.gwibber.com>). Turns out its really simple to do it. I&#8217;ll advice you to do this while Gwibber is not running.

**Assumptions**

  * This was tested on Ubuntu 11.04 and the instructions are meant to be for Ubuntu (Any Debian based distros should be similar)
  * The version of Gwibber this was tried against was 3.0.0.1.

## <span class="Apple-style-span" style="color:#000000;">Step 1 : Create your protocol file</span>

First of all, choose your URL shortner service. I will continue this example taking my own url shortner as example. To keep it secure I have obfuscated some parameter. If you want to use my service, just drop me an email or tweet. You are always welcome to use the web interface at <http://url.jairam.me> (I know the name is not creative. Suggestions are most welcome).

What you essentially need is a way of making an API call to your service. Once you know the format of the call, create a file, say urljairame.py, whose content should look like this &#8211;

<pre>1 """
  2
  3 url.jairam.me interface for Gwibber
  4 jairamc (Jairam Chandar) - 2011-09-30
  5
  6 """
  7
  8 import urllib2
  9
 10 PROTOCOL_INFO = {
 11
 12   "name": "url.jairam.me",
 13   "version": 0.1,
 14   "fqdn" : "http://url.jairam.me",
 15
 16 }
 17
 18 class URLShorter:
 19
 20   def short(self, text):
 21     <strong>short = urllib2.urlopen("http://url.jairam.me/yourls-api.php?signature=xxxxxxxxxx&action=shorturl&format=simple&url=%s" % urllib2.quote(text)).read()</strong>
 22     return short</pre>

The main line to notice is line number 21. Replace the text inside quotes with a suitable API call for the service you want and save this file. For instance, if you wanted to create a *bit.ly *service for Gwibber (currently not supported), here is an example (of course there is a little more voodoo involved with the bit.ly api) &#8211;

<pre>http://api.bitly.com/v3/shorten?login=bitlyapidemo&apiKey=R_0da49e0a9118ff35f52f629d2d71bf07&longUrl=http%3A%2F%2Fbetaworks.com%2F&format=txt</pre>

## Step 2 : Place the URL protocol in correct location

Copy the above protocol file to &#8220;/usr/share/pyshared/gwibber/microblog/urlshorter/&#8221; and then create a symlink to it from &#8220;/usr/lib/python2.7/dist-packages/gwibber/microblog/urlshorter&#8221;. Your version of python installed might be different.

<pre>sudo mv urljairamme.py /usr/share/pyshared/gwibber/microblog/urlshorter/"</pre>

<pre>sudo ln -s /usr/share/pyshared/gwibber/microblog/urlshorter/urljairamme.py /usr/lib/python2.7/dist-packages/gwibber/microblog/urlshorter/urljairamme.py</pre>

## Step 3 : Make Gwibber aware of your protocol file

Edit the \_\_init\_\_.py file (see location below) and add your new URL shortner service.

<pre>sudo vi <span class="Apple-style-span" style="font-family:'Courier 10 Pitch', Courier, monospace;font-size:13px;line-height:19px;white-space:pre;font-weight:normal;">/usr/lib/python2.7/dist-packages/gwibber/microblog/urlshorter/__init__.py</span></pre>

The file should look like this &#8211;

<pre>1
  2 import cligs, isgd, tinyurlcom, ur1ca, <strong>urljairamme</strong>
  3 #import snipurlcom, zima
  4
  5 PROTOCOLS = {
  6   "cli.gs": cligs,
  7   "is.gd": isgd,
  8   #"snipurl.com": snipurlcom,
  9   "tinyurl.com": tinyurlcom,
 10   "ur1.ca": ur1ca,
 11   <strong>"url.jairam.me": urljairamme,</strong>
 12   #"zi.ma": zima,
 13 }</pre>

Notice lines 2 and 11. These are the new/edited lines in the file for the new service.

##  Step 4 : Change preferences in Gwibber to the new URL shortner service

  1. Open Gwibber
  2. Edit -> Preferences -> Messages -> Advanced -> Select the new service

<div>
  And you are done.
</div>