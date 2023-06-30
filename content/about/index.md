---
title: About
date: 2015-08-13
lastmod: 2023-06-20
author: Jairam
showComments: false
aliases:
  - cv
---

## Professional and Academic Highlights

- More than **15 years of experience** as a software engineer
- Experience leading different teams, both remote and in-person
- Extensive experience with Amazon AWS and related infrastructure solutions
- Awarded **Masters in Computer Science** with Distinction from the University of Edinburgh
- M.Sc. dissertation involved work on Join-Algorithms using **Hadoop**.


## Technical Skills

{{% columns %}}

#### Technologies
  - [Hadoop][hadoop]
  - [Cassandra][cassandra]
  - [Kafka][kafka]
  - [HBase][hbase]
  - [Hive][hive]
  - [Elasticsearch][elasticsearch]

<--->

#### Languages
  - Java
  - Scala

<--->

#### Platforms
  - Unix/Linux
  - [Amazon AWS][aws]
  - Docker

{{% /columns %}}

## Relevant Work Experience

### Meltwater U.K. Ltd.
(August 2018 - Present)

#### Designation - Principal Software Engineer and Team Lead

Responsible for productionizing Artificial Intelligence algorithms designed for intelligently crawling and extracting editorial content from the Internet.
Technologies involved:

- AWS Cloud Stack - including, but not limited to:
  - EC2
  - ECS/ECR
  - Lambda
  - RDS
- Java
- Docker
- RabbitMQ
- Dropwizard/Jersey REST
- Spring Boot
- Terraform 

As the Team Lead, also responsible for things like, planning, stakeholder management, process improvements, cost estimations, mentoring, career management etc. 

### QuantumBlack Visual Analytics Ltd., London, UK
(October 2016 - June 2018)

#### Designation - Platform Engineer

Joined the QuantumBlack Platform Team working to design and create backend systems that support various Data Science solutions in the company. 
Also took on the role of **Solutions Architect** for some projects which involved direct interaction with the customers. Technolgies used:

- [Scala][scala]
- [Spark][spark]
- [Mesos][mesos]

### Mediasift Ltd. (trading as Datasift Inc.), Reading, UK
(September 2011 - October 2016)

#### Designation - Engineering Team Lead

Started in the company as a Big Data Engineer. As part of the data-warehousing team at Datasift, primarily responsible for archiving, curating and retrieval of massive amounts of social data accumulated every day. The data is in the order of 2 TB/day. Technologies used include -

- [Hadoop][hadoop] (Map Reduce / HDFS)
- [HBase][hbase]
- [Scala][scala]

Played a key role in development of Historics platform for mining archived social media data for customers.

Was **promoted to Engineering Team Lead in late 2014**. Involved at important stages in design and development of
the [PYLON for Facebook Topic Data][PYLON] product. Technologies used include -

- [Kafka][kafka]
- [Elasticsearch][elasticsearch]


### Imagini Europe Limited, London, UK
(December 2010 - September 2011)

#### Designation - Back-End Developer

Working on Data Warehousing solutions using NoSql technologies. Key player in build, maintenance and use of the following solutions, standalone or in conjunction with each other -

- Cassandra – Primary Data-store
  - Over 4 TB of data that is used for real-time access and analytics
- Hadoop - Main analytics engine
  - Played a major role in integrating and smooth functioning of the analytics cluster with the data-store. Primarily responsible for generating analytics data using Map/Reduce programs written in Java. Using the knowledge gained, gave a [talk][cassandra-podcast] at a public meet-up. Podcast available [here][cassandra-podcast]
- Hive
  - Most of the services hosted on the cloud, events system logs reside on [Amazon S3](http://aws.amazon.com/s3/). Responsible for running Hive queries over these logs using [Amazon Elastic MapReduce](http://aws.amazon.com/elasticmapreduce/).


## Relevant Education

### MSc - Computer Science [Awarded Distinction]
(Sept 2009 - Sept 2010)

#### School of Informatics, University of Edinburgh (Edinburgh, U.K.)

Specialization Modules -

- Design & Analysis of Parallel Algorithms
- Advance Databases
- Distributed Systems
- Parallel Programming Languages & Systems
- Human Computer Interaction
- Compiler Optimisation
- Text Technologies & Information Retrieval
- Querying & Storing XML

Course work -

- **Dissertation - Join algorithms using Map/Reduce** - Evaluated existing join algorithms used in contemporary systems that use Map/Reduce. Designed two new algorithms for multi-way joins. Properties like selectivity factor of a join were exploited in design of the algorithms. The project was implemented using **[Hadoop][hadoop]** and **HDFS**. The coding was entirely done in Java. The evaluation was done based on speed-up, scale-up and network I/O. The thesis was awarded distinction and is available for [download][dissertation] from the University website [here][dissertation]
- **Advanced Databases** - Extended the query engine of a home grown database to implement External Sort and Merge join algorithms. I managed to secure 100% in the coursework and the work was appreciated to be the best amongst the batch.
- **Information Retrieval** - Developed a web crawler (using Python) capable of harvesting a set of hyper-linked news stories from a web-server. Implemented content-extraction algorithm using plateau-based method. Also implemented near-duplicate detection feature using SimHash algorithm. Also developed a system for searching images based on keywords (tags). Implemented exact-match, best-match and pseudo-relevance feedback algorithm.
- **Querying and Storing XML** - Implemented an algorithm for updating XML via Relational Databases with 2 other collaborators. The project involved incrementally updating recursively stored XML, stored in an existing relational database, as opposed to previous approaches that shred the entire XML document into a newly created database of a newly designed schema.
- **Distributed Systems** - Implemented a simulation of Chandy-Lamport snapshot algorithm which is used in distributed systems for recording a consistent global state of an asynchronous system.

##  Previous Work Experience

### Microsoft India (R&D) Private Limited, Hyderabad, India
(June 2007 - April 2009)

#### Designation - Software Development Engineer

All projects involved work on Microsoft Technology Stack. Almost all the coding was done in C# and all projects used Visual Studio Team Suite.

##  Previous Education

### B.Tech - Computer Science Engineering
(July 2003 - May 2007)

#### Amrita School of Engineering, Amrita Vishwa Vidyapeetham (Coimbatore, India)

- Scored cumulative grade point average of 9.1 (on 10)
- Won Best Student Project award for a project on Machine Translation as part of my final year student project. The application translates given input text in English to Hindi with acceptable levels of accuracy.


[hadoop]: http://hadoop.apache.org/
[hbase]: http://hbase.apache.org/
[hive]: http://hive.apache.org/
[cassandra]: http://cassandra.apache.org/
[kafka]: http://kafka.apache.org/
[elasticsearch]: https://www.elastic.co/products/elasticsearch
[scala]: https://www.scala-lang.org/
[spark]: https://spark.apache.org/
[mesos]: https://mesos.apache.org/
[aws]: http://aws.amazon.com/
[PYLON]: http://datasift.com/products/pylon-for-facebook-topic-data/
[cassandra-podcast]: http://skillsmatter.com/podcast/home/cassandra-meetup-march
[dissertation]: http://www.inf.ed.ac.uk/publications/thesis/online/IM100859.pdf
