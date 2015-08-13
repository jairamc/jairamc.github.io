---
title: Evolution of Hadoop support in Cassandra
author: Jairam
layout: post
permalink: /2011/11/evolution-of-hadoop-support-in-cassandra/
yourls_tweeted:
  - 1
  - 1
yourls_shorturl:
  - http://url.jairam.me/2g
  - http://url.jairam.me/2g
original_post_id:
  - 246
  - 246
categories:
  - Technology
tags:
  - Bigdata
  - Cassandra
  - CassandraLondon
  - Hadoop
  - Hadoop Analytics
  - NoSql
---
Below is a compilation of all changes that were made in the Cassandra code base related to Hadoop support. The source for this compilation is [http://svn.apache.org/repos/asf/cassandra/trunk/CHANGES.txt][1]. I have tried my best to avoid any misses or mistakes. In case you notice something amiss, please drop in a comment and I will fix it.

## 1.0.1

  * Skip empty rows when slicing the entire row ([CASSANDRA-2855][2])
  * Make CFIF try rpc\_address or fallback to listen\_address (<a title="https://issues.apache.org/jira/browse/CASSANDRA-3214" href="https://issues.apache.org/jira/browse/CASSANDRA-3214" target="_blank">CASSANDRA-3214</a>)
  * Accept comma delimited lists of initial thrift connections (<a title="https://issues.apache.org/jira/browse/CASSANDRA-3158" href="https://issues.apache.org/jira/browse/CASSANDRA-3158" target="_blank">CASSANDRA-3185</a>)

## 0.8.7

  * Allow wrapping ranges in queries (<a title="https://issues.apache.org/jira/browse/CASSANDRA-3137" href="https://issues.apache.org/jira/browse/CASSANDRA-3137" target="_blank">CASSANDRA-3137</a>)
  * Check all interfaces for a match with split location before falling back to random replica (<a title="https://issues.apache.org/jira/browse/CASSANDRA-3211" href="https://issues.apache.org/jira/browse/CASSANDRA-3211" target="_blank">CASSANDRA-3211</a>)
  * Make Pig storage handle implements LoadMetadata (<a title="https://issues.apache.org/jira/browse/CASSANDRA-2777" href="https://issues.apache.org/jira/browse/CASSANDRA-2777" target="_blank">CASSANDRA-2777</a>)
  * Fix exception during PIG &#8216;dump&#8217; (<a href="https://issues.apache.org/jira/browse/CASSANDRA-2810" target="_blank">CASSANDRA-2810</a>)

## 0.8.5

  * Fail jobs when Cassandra node has failed but TaskTracker has not (<a title="https://issues.apache.org/jira/browse/CASSANDRA-2388" href="https://issues.apache.org/jira/browse/CASSANDRA-2388" target="_blank">CASSANDRA-2388</a>)

## 0.8.3

  * Add counter support to Hadoop InputFormat (<a title="https://issues.apache.org/jira/browse/CASSANDRA-2981" href="https://issues.apache.org/jira/browse/CASSANDRA-2981" target="_blank">CASSANDRA-2981</a>)

## 0.8.2

  * Add KeyRange option to Hadoop inputformat (<a title="https://issues.apache.org/jira/browse/CASSANDRA-1125" href="https://issues.apache.org/jira/browse/CASSANDRA-1125" target="_blank">CASSANDRA-1125</a>)

## 0.8.1

  * Fix race that could result in Hadoop writer failing to throw an exception encountered after close() (<a title="https://issues.apache.org/jira/browse/CASSANDRA-2755" href="https://issues.apache.org/jira/browse/CASSANDRA-2755" target="_blank">CASSANDRA-2755</a>)

## 0.8.0

  * Switch to native Thrift for Hadoop map/reduce (<a title="https://issues.apache.org/jira/browse/CASSANDRA-2667" href="https://issues.apache.org/jira/browse/CASSANDRA-2667" target="_blank">CASSANDRA-2667</a>)

## 0.7.5

  * Allow job configuration to set the CL used in Hadoop jobs (<a title="https://issues.apache.org/jira/browse/CASSANDRA-2331" href="https://issues.apache.org/jira/browse/CASSANDRA-2331" target="_blank">CASSANDRA-2331</a>)

## 0.7.3

  * Fix Hadoop ColumnFamilyOutputFormat dropping of mutations when batch fills up (<a title="https://issues.apache.org/jira/browse/CASSANDRA-2255" href="https://issues.apache.org/jira/browse/CASSANDRA-2255" target="_blank">CASSANDRA-2255</a>)

## 0.7.1

  * Retry hadoop split requests on connection failure (<a title="https://issues.apache.org/jira/browse/CASSANDRA-1927" href="https://issues.apache.org/jira/browse/CASSANDRA-1927" target="_blank">CASSANDRA-1927</a>)

## 0.7.0-rc2

  * Support multiple Mutations per key in hadoop ColumnFamilyOutputFormat (<a title="https://issues.apache.org/jira/browse/CASSANDRA-1774" href="https://issues.apache.org/jira/browse/CASSANDRA-1774" target="_blank">CASSANDRA-1774</a>)

## 0.7-beta2

  * Remove cassandra.yaml dependency from Hadoop and Pig (<a title="https://issues.apache.org/jira/browse/CASSANDRA-1322" href="https://issues.apache.org/jira/browse/CASSANDRA-1322" target="_blank">CASSADRA-1322</a>)
  * Support for Hadoop Streaming \[non-jvm map/reduce via stdin/out\] (<a title="https://issues.apache.org/jira/browse/CASSANDRA-1322" href="https://issues.apache.org/jira/browse/CASSANDRA-1322" target="_blank">CASSANDRA-1368</a>)
  * Rewrite Hadoop ColumnFamilyRecordWriter to pool connections, retry to multiple Cassandra nodes, and smooth impact on the Cassandra cluster by using smaller batch sizes (<a title="https://issues.apache.org/jira/browse/CASSANDRA-1434" href="https://issues.apache.org/jira/browse/CASSANDRA-1434" target="_blank">CASSANDRA-1434</a>)

## 0.7-beta1

  * Added hadoop OutputFormat (<a title="https://issues.apache.org/jira/browse/CASSANDRA-1101" href="https://issues.apache.org/jira/browse/CASSANDRA-1101" target="_blank">CASSANDRA-1101</a>)

## 0.6.4

  * Hadoop jobs no longer require the Cassandra storage-conf.xml (<a title="https://issues.apache.org/jira/browse/CASSANDRA-1280" href="https://issues.apache.org/jira/browse/CASSANDRA-1280" target="_blank">CASSANDRA-1280</a>, <a title="https://issues.apache.org/jira/browse/CASSANDRA-1047" href="https://issues.apache.org/jira/browse/CASSANDRA-1047" target="_blank">CASSANDRA-1047</a>)

## 0.6.2

  * Fix SlicePredicate serialization inside Hadoop jobs (<a title="https://issues.apache.org/jira/browse/CASSANDRA-1049" href="https://issues.apache.org/jira/browse/CASSANDRA-1049" target="_blank">CASSANDRA-1049</a>)
  * Close Thrift sockets in Hadoop ColumnFamilyRecordReader (<a title="https://issues.apache.org/jira/browse/CASSANDRA-1081" href="https://issues.apache.org/jira/browse/CASSANDRA-1081" target="_blank">CASSANDRA-1081</a>)

## 0.6.1

  * Use hostnames in CFInputFormat to allow Hadoop&#8217;s naive string-based locality comparisons to work (<a title="https://issues.apache.org/jira/browse/CASSANDRA-955" href="https://issues.apache.org/jira/browse/CASSANDRA-955" target="_blank">CASSANDRA-955</a>)

## 0.6.0-beta3

  * Fix hardcoded row count in Hadoop RecordReader (<a title="https://issues.apache.org/jira/browse/CASSANDRA-837" href="https://issues.apache.org/jira/browse/CASSANDRA-837" target="_blank">CASSANDRA-837</a>)

## 0.6.0-beta1/beta2

  * Basic Hadoop map/reduce support (<a title="https://issues.apache.org/jira/browse/CASSANDRA-342" href="https://issues.apache.org/jira/browse/CASSANDRA-342" target="_blank">CASSANDRA-342</a>)

&nbsp;

 [1]: http://svn.apache.org/repos/asf/cassandra/trunk/CHANGES.txt "Apache Cassandra - CHANGES.txt"
 [2]: https://issues.apache.org/jira/browse/CASSANDRA-2855 "https://issues.apache.org/jira/browse/CASSANDRA-2855"