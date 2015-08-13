---
title: Git and Github Secrets
author: Jairam
layout: post
permalink: /2013/02/git-and-github-secrets/
categories:
  - Technology
tags:
  - Git
  - Github
---
Following are notes that I took from the video at <http://zachholman.com/talk/git-github-secrets/>. I highly recommend watching that video if you are a git/github user.

GitHub &#8211;

Add .diff or .patch at the end of the URL in Pull-Request/Commits to get a patch file  
Add ?author=<username> at the end of URL in commit log page to see commit from a specific author  
Add ?w=1 to truncate white spaces on compare pages  
Type &#8220;t&#8221; to search for files in repo  
Type &#8220;?&#8221; to see the shortcuts (context aware) available on a page  
Can use EMOJI icons while commenting. <img src="http://i1.wp.com/blog.jairam.me/wp-includes/images/smilies/simple-smile.png?w=660" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" data-recalc-dims="1" /> Just put : (colon) and the emoji name. See www.emoji-cheat-sheet.com. Eg. :poo  
Advanced Compare Views &#8211; <url>/MASTER@{2012-12-11}&#8230;MASTER. Eg. https://github.com/datasift/playback/compare/master@{2012-12-05}&#8230;master

Git &#8211;

To allow an empty commit &#8211;  
> git commit -m &#8220;Look at me Trololol&#8221; &#8211;allow-empty

For intelligent commits &#8211;  
> git add -p

To go back to previous branch &#8211;  
> git checkout &#8211;

To search in the commit log  
> git show :/<search keyword>

To see the branches merged in the current branch  
> git branch &#8211;merged

To see branches not merged in the current branch &#8211;  
> git branch &#8211;no-merged

To check if a branch contains a specific commit &#8211;  
> git branch &#8211;contains <commit SHA>

To copy a file from a different branch to current one (without having to merge the entire branch)  
> git checkout BRANCH &#8212; path/to/file.scala  
Copies file.scala to BRANCH without switching branches

Commits in Branch A and not in Branch B  
> git log branchA ^branchB

If you accidently delete a branch that had commits you wanted, you can recover the commits by running  
> git fsck &#8211;lost-found

Git Blame arguments &#8211;  
> git blame -w (ignores whitespace changes)  
> git blame -M (makes blame intelligent. It ignores changes where code line were just moved)

Better Status &#8211;  
> git status -sb (less verbose)

See which word(s) exactly changed  
> git diff HEAD^ &#8211;word-diff

More color  
> git config &#8211;global color.ui 1

Amend a commit that hasn&#8217;t been pushed yet  
> git commit &#8211;amend
