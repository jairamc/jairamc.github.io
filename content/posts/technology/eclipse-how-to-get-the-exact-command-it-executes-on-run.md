---
author: Jairam
categories:
- Technology
date: "2011-09-27T00:00:00Z"
tags:
- eclipse
- java
- scala
title: Eclipse - How to get the exact command it executes on Run
---
While trying to run a Scala/Java mix project, I ran into a problem where Eclipse was successfully able to launch my program, whereas when I tried to launch the same program from the command-line, I faced one problem after another. After a lot of search-fix-find-new-problem cycles, I decided to find out exactly what was the command eclipse was launching. Obviously, Google to my rescue. I found this thread - <http://stackoverflow.com/questions/1989419/eclipse-is-there-a-way-to-get-eclipse-to-output-the-commands-given-to-run-your-p>

Just wanted to jot down the steps here again (these are reproduced as is from the above thread)

1. Run your program inside Eclipse.
2. Go to the Debug perspective.
3. Terminate the program, or let it end. right click on the second line. (Terminated, exit value... ) and select properties. in there you will have the full command line used.
