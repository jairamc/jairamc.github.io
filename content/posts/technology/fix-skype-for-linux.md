---
author: Jairam
categories:
- Technology
date: "2011-05-26T00:00:00Z"
tags:
- Skype
title: Fix skype for linux
---
{{< badge >}}
Obsolete Post
{{< /badge >}}
*Update : Looks like someone in skype realized that they had not put in instructions for linux and have update their [page](http://heartbeat.skype.com/2011/05/problems_signing_into_skype_an.html). It's the same as below.*

A lot of us have been facing this issue that skype seems to just kill itself after you login. While skype issued a [temporary fix](http://heartbeat.skype.com/2011/05/problems_signing_into_skype_an.html) today morning for Windows and Mac, they have conveniently forgotten to mention a solution for their linux client.

Based on their solution for Windows, I managed to fix it for linux as well. Just quit skype and do the following -

<pre>rm ~/.Skype/shared.xml</pre>

And voila! Restart skype and it should work fine.

Cheers!
