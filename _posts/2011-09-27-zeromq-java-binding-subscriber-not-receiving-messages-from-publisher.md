---
title: ZeroMQ Java Binding - Subscriber not receiving messages from Publisher
author: Jairam
layout: post
permalink: /2011/09/zeromq-java-binding-subscriber-not-receiving-messages-from-publisher/
categories:
  - Technology
tags:
  - jzmq
  - zeromq
  - zmq
---
While trying out the Java bindings for ZeroMQ, I came across this problem. Basically, the subscriber was not receiving messages from the publisher. After a lot of meddling around, turns out that the publisher was trying send messages even before the socket binding had completed. Weird behaviour, but one that could be easily avoided by just putting a sleep for 2 seconds before you start publishing messages.

Read more about ZeroMQ at [http://www.zeromq.org/][1]

&nbsp;

 [1]: http://www.zeromq.org/ "ZeroMQ"
