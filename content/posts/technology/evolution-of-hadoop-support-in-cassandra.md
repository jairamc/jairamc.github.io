---
author: Jairam
categories:
- Technology
date: "2011-11-08T00:00:00Z"
tags:
- Bigdata
- Cassandra
- CassandraLondon
- Hadoop
- Hadoop Analytics
- NoSql
title: Evolution of Hadoop support in Cassandra
---
Below is a compilation of all changes that were made in the Cassandra code base related to Hadoop support. The source for this compilation is [Apache Cassandra - CHANGES.txt](http://svn.apache.org/repos/asf/cassandra/trunk/CHANGES.txt). I have tried my best to avoid any misses or mistakes. In case you notice something amiss, please drop in a comment and I will fix it.

## 1.0.1

  - Skip empty rows when slicing the entire row ([CASSANDRA-2855](https://issues.apache.org/jira/browse/CASSANDRA-2855))
  - Make CFIF try rpc\_address or fallback to listen\_address ([CASSANDRA-3214](https://issues.apache.org/jira/browse/CASSANDRA-3214))
  - Accept comma delimited lists of initial thrift connections ([CASSANDRA-3158](https://issues.apache.org/jira/browse/CASSANDRA-3158))

## 0.8.7

  - Allow wrapping ranges in queries ([CASSANDRA-3137](https://issues.apache.org/jira/browse/CASSANDRA-3137))
  - Check all interfaces for a match with split location before falling back to random replica ([CASSANDRA-3211](https://issues.apache.org/jira/browse/CASSANDRA-3211))
  - Make Pig storage handle implements LoadMetadata ([CASSANDRA-2777](https://issues.apache.org/jira/browse/CASSANDRA-2777))
  - Fix exception during PIG &#8216;dump&#8217; ([CASSANDRA-2810](https://issues.apache.org/jira/browse/CASSANDRA-2810))

## 0.8.5

  - Fail jobs when Cassandra node has failed but TaskTracker has not ([CASSANDRA-2388](https://issues.apache.org/jira/browse/CASSANDRA-2388))

## 0.8.3

  - Add counter support to Hadoop InputFormat ([CASSANDRA-2981](https://issues.apache.org/jira/browse/CASSANDRA-2981))

## 0.8.2

  - Add KeyRange option to Hadoop inputformat ([CASSANDRA-1125](https://issues.apache.org/jira/browse/CASSANDRA-1125))

## 0.8.1

  - Fix race that could result in Hadoop writer failing to throw an exception encountered after close ([CASSANDRA-2755](https://issues.apache.org/jira/browse/CASSANDRA-2755))

## 0.8.0

  - Switch to native Thrift for Hadoop map/reduce ([CASSANDRA-2667](https://issues.apache.org/jira/browse/CASSANDRA-2667))

## 0.7.5

  - Allow job configuration to set the CL used in Hadoop jobs ([CASSANDRA-2331](https://issues.apache.org/jira/browse/CASSANDRA-2331))

## 0.7.3

  - Fix Hadoop ColumnFamilyOutputFormat dropping of mutations when batch fills up ([CASSANDRA-2255](https://issues.apache.org/jira/browse/CASSANDRA-2255))

## 0.7.1

  - Retry hadoop split requests on connection failure ([CASSANDRA-1927](https://issues.apache.org/jira/browse/CASSANDRA-1927))

## 0.7.0-rc2

  - Support multiple Mutations per key in hadoop ColumnFamilyOutputFormat ([CASSANDRA-1774](https://issues.apache.org/jira/browse/CASSANDRA-1774))

## 0.7-beta2

  - Remove cassandra.yaml dependency from Hadoop and Pig ([CASSANDRA-1322](https://issues.apache.org/jira/browse/CASSANDRA-1322))
  - Support for Hadoop Streaming \[non-jvm map/reduce via stdin/out\] ([CASSANDRA-1368](https://issues.apache.org/jira/browse/CASSANDRA-1368))
  - Rewrite Hadoop ColumnFamilyRecordWriter to pool connections, retry to multiple Cassandra nodes, and smooth impact on the Cassandra cluster by using smaller batch sizes ([CASSANDRA-1434](https://issues.apache.org/jira/browse/CASSANDRA-1434))

## 0.7-beta1

  - Added hadoop OutputFormat ([CASSANDRA-1101](https://issues.apache.org/jira/browse/CASSANDRA-1101))

## 0.6.4

  - Hadoop jobs no longer require the Cassandra storage-conf.xml ([CASSANDRA-1047](https://issues.apache.org/jira/browse/CASSANDRA-1047))

## 0.6.2

  - Fix SlicePredicate serialization inside Hadoop jobs ([CASSANDRA-1049](https://issues.apache.org/jira/browse/CASSANDRA-1049))
  - Close Thrift sockets in Hadoop ColumnFamilyRecordReader ([CASSANDRA-1081](https://issues.apache.org/jira/browse/CASSANDRA-1081))

## 0.6.1

  - Use hostnames in CFInputFormat to allow Hadoop&#8217;s naive string-based locality comparisons to work ([CASSANDRA-955](https://issues.apache.org/jira/browse/CASSANDRA-955))

## 0.6.0-beta3

  - Fix hardcoded row count in Hadoop RecordReader ([CASSANDRA-837](https://issues.apache.org/jira/browse/CASSANDRA-837))

## 0.6.0-beta1/beta2

  - Basic Hadoop map/reduce support ([CASSANDRA-342](https://issues.apache.org/jira/browse/CASSANDRA-342))
