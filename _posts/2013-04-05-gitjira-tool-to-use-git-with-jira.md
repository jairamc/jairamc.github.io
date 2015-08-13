---
title: GitJira - Tool to use Git with Jira
author: Jairam
layout: post
permalink: /2013/04/gitjira-tool-to-use-git-with-jira/
categories:
  - Technology
tags:
  - Git
  - Github
  - Jira
  - Python
---
A lot of us use Git to maintain our code-base. And a lot of companies out there, like mine, use Jira for project management. A nice feature of Jira is the [Git Version Control Viewer][1], which lets one track all the commits made against a ticket. The catch being, you have to mention the ticket number in your commits.  While this is not that big a deal, it gave me an idea for a simple project I could write to learn python.

Together with [Michael Pitidis][2], we wrote a tool in python that sets up the Git & Jira integration for the developer. We called it <a title="GitJira" href="https://github.com/jairamc/gitjira" target="_blank">GitJira</a> (we decided to use the creativity in the code rather than the name). Of course, the pre-requisite is that you have the <a href="https://marketplace.atlassian.com/plugins/com.xiplink.jira.git.jira_git_plugin" target="_blank">Git Version Control Viewer</a> plugin installed in Jira (comes by default).

In its present form, it supports three functionalities &#8211;

  * Create branches of the format &#8211; `<issue type>/<ticket number>` &#8211; given just the ticket id
  * Automatically transition tickets to in-progress when you create a branch for a ticket
  * Fetch the summary of a ticket and add to commit message when committing a branch created by gitjira

So for instance, if you do

<pre>gitjira -b ABC-123</pre>

it will automatically query your Jira instance and get the issue type (lets say a bug) and create a branch called &#8211;

<pre>bug/ABC-123</pre>

and will change the status of the ticket to in-progress.

When you try to commit this branch

<pre>gitjira -c</pre>

it will fetch the ticket summary and automatically add it to your Git commit message and leave you in your Git text editor.

For more information, take a look at the <a title="GitJira" href="https://github.com/jairamc/gitjira" target="_blank">GitJira</a> github <a title="GitJira" href="https://github.com/jairamc/gitjira" target="_blank">page</a>. Please feel free to contribute or raise issues if you would like to improve it.

&nbsp;

 [1]: https://marketplace.atlassian.com/plugins/com.xiplink.jira.git.jira_git_plugin "Git Version Control Viewer"
 [2]: https://github.com/mpitid "Michael Pitidis"
