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
A lot of us use Git to maintain our code-base. And a lot of companies out there, like mine, use Jira for project management. A nice feature of Jira is the [Git Version Control Viewer](https://marketplace.atlassian.com/plugins/com.xiplink.jira.git.jira_git_plugin), which lets one track all the commits made against a ticket. The catch being, you have to mention the ticket number in your commits.  While this is not that big a deal, it gave me an idea for a simple project I could write to learn python.

Together with [Michael Pitidis](https://github.com/mpitid), we wrote a tool in python that sets up the Git & Jira integration for the developer. We called it [GitJira](https://github.com/jairamc/gitjira) (we decided to use the creativity in the code rather than the name). Of course, the pre-requisite is that you have the [Git Version Control Viewer](https://marketplace.atlassian.com/plugins/com.xiplink.jira.git.jira_git_plugin) plugin installed in Jira (comes by default).

In its present form, it supports three functionalities -

  * Create branches of the format - `<issue type>/<ticket number>` - given just the ticket id
  * Automatically transition tickets to in-progress when you create a branch for a ticket
  * Fetch the summary of a ticket and add to commit message when committing a branch created by gitjira

So for instance, if you do

```sh
gitjira -b ABC-123
```

it will automatically query your Jira instance and get the issue type (lets say a bug) and create a branch called -

```sh
bug/ABC-123
```

and will change the status of the ticket to in-progress.

When you try to commit this branch

```sh
gitjira -c
```

it will fetch the ticket summary and automatically add it to your Git commit message and leave you in your Git text editor.

For more information, take a look at the [GitJira](https://github.com/jairamc/gitjira) [github page](https://github.com/jairamc/gitjira). Please feel free to contribute or raise issues if you would like to improve it.
