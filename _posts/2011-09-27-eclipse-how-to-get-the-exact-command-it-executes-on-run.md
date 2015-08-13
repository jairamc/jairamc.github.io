---
title: 'Eclipse &#8211; How to get the exact command it executes on Run'
author: Jairam
layout: post
permalink: /2011/09/eclipse-how-to-get-the-exact-command-it-executes-on-run/
yourls_tweeted:
  - 1
  - 1
yourls_shorturl:
  - http://url.jairam.me/13
  - http://url.jairam.me/13
original_post_id:
  - 221
  - 221
categories:
  - Technology
tags:
  - debug
  - eclipse
  - java
  - scala
---
While trying to run a Scala/Java mix project, I ran into a problem where Eclipse was successfully able to launch my program, whereas when I tried to launch the same program from the command-line, I faced one problem after another. After a lot of search-fix-find-new-problem cycles, I decided to find out exactly what was the command eclipse was launching. Obviously, Google to my rescue. I found this thread &#8211; <http://stackoverflow.com/questions/1989419/eclipse-is-there-a-way-to-get-eclipse-to-output-the-commands-given-to-run-your-p>

Just wanted to jot down the steps here again (these are reproduced as is from the above thread) &#8211;

<div style="background-color:silver;">
  <ol>
    <li>
      Run your program inside Eclipse.
    </li>
    <li>
      Go to the Debug perspective.
    </li>
    <li>
      Terminate the program, or let it end. right click on the second line. (Terminated, exit value&#8230; ) and select properties. in there you will have the full command line used.
    </li>
  </ol>
</div>