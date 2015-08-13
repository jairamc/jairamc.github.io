---
title: Scala in Eclipse using Maven &#8211; M2Eclipse connector
author: Jairam
layout: post
permalink: /2011/09/scala-in-eclipse-using-maven-m2eclipse-connector/
categories:
  - Technology
tags:
  - eclipse
  - m2e
  - m2e-scala
  - maven
  - scala
---
While playing around with building Scala projects using Maven in Eclipse, I ran into a few problems. I solved these using the steps mentioned below.

Assumptions -

  - Familiarity with Maven
  - Either you have a Maven project in SVN written in Scala or you know how to create one using a Maven build file
  - You have installed the SVN plugin for eclipse ([http://www.eclipse.org/subversive/downloads.php][1])
  - You have installed the M2E (Maven) plugin for Eclipse ([http://www.eclipse.org/m2e/][2])

When creating your *pom.xml* file, you will run into the following error -

```
No marketplace entries found to handle maven-scala-plugin:2.15.2:compile in Eclipse.  Please see Help for more information.
```

And/Or

```
Plugin execution not covered by lifecycle configuration: org.scala-tools:maven-scala-plugin
```

The reason for the above error is that you need to install the m2e-scala connector which still does not seem to have made into the mainstream M2E marketplace (you will encounter this while installing M2E or creating/checking-out a Maven project). To install this connector, add **http://alchim31.free.fr/m2e-scala/update-site/** to your _Available Software Sites_ in Eclipse and install the connector following the installation dialog. And you are done.

 [1]: http://www.eclipse.org/subversive/downloads.php "Subversive"
 [2]: http://www.eclipse.org/m2e/ "M2E"
