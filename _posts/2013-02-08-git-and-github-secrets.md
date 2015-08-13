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

GitHub -

Add .diff or .patch at the end of the URL in Pull-Request/Commits to get a patch file  
Add ?author=<username> at the end of URL in commit log page to see commit from a specific author  
Add ?w=1 to truncate white spaces on compare pages  
Type "t" to search for files in repo  
Type "?" to see the shortcuts (context aware) available on a page  
Can use EMOJI icons while commenting. :wink: Just put : (colon) and the emoji name. See www.emoji-cheat-sheet.com. Eg. :poo  
Advanced Compare Views - <url>/MASTER@{2012-12-11}..MASTER. Eg. https://github.com/datasift/playback/compare/master@{2012-12-05}..master

Git -

To allow an empty commit -  
> git commit -m "Look at me Trololol" -allow-empty

For intelligent commits -  
> git add -p

To go back to previous branch -  
> git checkout -

To search in the commit log  
> git show :/<search keyword>

To see the branches merged in the current branch  
> git branch -merged

To see branches not merged in the current branch -  
> git branch -no-merged

To check if a branch contains a specific commit -  
> git branch -contains <commit SHA>

To copy a file from a different branch to current one (without having to merge the entire branch)  
> git checkout BRANCH -- path/to/file.scala  
Copies file.scala to BRANCH without switching branches

Commits in Branch A and not in Branch B  
> git log branchA ^branchB

If you accidently delete a branch that had commits you wanted, you can recover the commits by running  
> git fsck -lost-found

Git Blame arguments -  
> git blame -w (ignores whitespace changes)  
> git blame -M (makes blame intelligent. It ignores changes where code line were just moved)

Better Status -  
> git status -sb (less verbose)

See which word(s) exactly changed  
> git diff HEAD^ -word-diff

More color  
> git config -global color.ui 1

Amend a commit that hasn't been pushed yet  
> git commit -amend
