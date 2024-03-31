---
author: Jairam
categories:
- Technology
date: "2013-04-05T00:00:00Z"
tags:
- bigdata
- datasift
- hadoop
- hbase
- hdfs
- nosql
- scheduling
title: Datasift Historics - Keep making it better!
---
_I recently wrote a post for our company's [developer blog](http://dev.datasift.com/blog). Below is a reproduction of the same._

A year ago, [Datasift](https://datasift.com) released [Datasift Historics](http://blog.datasift.com/2011/12/07/historic/), a product that enabled users to access content from the past. Its demand has grown massively over the past year. We have had to make many optimizations in order to keep up with not just the demand, but the scale of our ever-growing archive.

Our Historics archive is very close to one petabyte in size now and we are adding about two terabytes to it each day. We run over 2,000 Hadoop jobs every month that scan over a total of nine trillion records cumulatively. Hence, we must ensure that every single component involved in extracting information from this archive is as efficient as possible.

Now, here’s the thing about Datasift: we are never satisfied with our improvements. We always strive to make our platform better and faster. A while back, our Chief Technical Architect, Lorenzo Alberton, wrote a [blog](http://dev.datasift.com/blog/optimizing-hadoop-jobs) on how we optimized our Hadoop jobs. Those optimizations vastly improved the speed at which we scanned and filtered our archive to give users what they want quickly. We mainly concentrated on improving our I/O times. And we achieved that by improving our job scheduling to run multiple user queries in one Hadoop job, thereby reading the data once and filtering it for multiple users.

But still not satisfied with our improvements, we have made two major changes:

  - Moved our archive from HBase to raw Hadoop Distributed File System (HDFS).
  - Changed our scheduling algorithm in order to give each user a fairer share of the cluster.

## Moving our archive from HBase to raw HDFS

HBase is a brilliant solution for high write-throughput use cases. However, the extra overhead it incurred while querying data through Hadoop was giving us a lot of grief. We hit the ceiling with the I/O throughput we could achieve, mainly because Hadoop over HBase has to go through HBase RegionServers in order to ensure any data still in memory (yet to be flushed to disk) is read as well. The idea behind using HBase was to provide random access to data and we realized that almost all our applications working on the archive were doing streaming reads. The ideal solution for us then was to move our archive to raw HDFS.

When we ran a Historics query on some of the migrated data in our archive, we saw a 300 percent improvement in our job completion times. Earlier, it used to take queries up to 15 hours to read and filter a month’s worth of archive. Now, we are able to achieve the same in close to five hours. This was, of course, for a simple query, but we have seen similar improvements for complex queries too.

The migration to raw HDFS was more difficult than you would imagine. We couldn’t afford to simply shut down Historics while we migrated the data. So we came up with a solution that could connect to both the old archive on HBase and the migrated archive on HDFS. This solution is still being used as we are in the process of migrating all the archive across to raw HDFS. This also meant that we had to provision new hardware to accommodate for what would be a second archive of the same size as the first, while we still continued to write every new interaction that was coming our way.

## New and improved job scheduling

One of the main concerns for us while designing the Historics system was to ensure all users receive a fair share of our computing cluster. In his [blog](http://dev.datasift.com/blog/optimizing-hadoop-jobs), Lorenzo explained the original queuing algorithm we used for all Historics queries. We have now updated this algorithm to improve the user experience.

We have introduced user-based queues where each user gets their own queue of queries. We break these queries into chunks that represent a day’s worth of data from the archive. For example, a Historics query for a week’s worth of data will consist of seven chunks. These chunks are then added to a user queue based on how old the chunk is (oldest first). It is important to note the difference between a job and a chunk. A job refers to the Hadoop job on the cluster, whereas a chunk is simply a day’s worth of work. Multiple chunks can run in the same job.

With the queues prepared, we pick the ‘n’ number of users with the oldest queries in their queues, where ‘n’ is the pre-determined size of the user pool we process at a given time. We then use the round-robin format among these user queues to pick one chunk to run at a time.

For example, two users with two chunks each would have their chunks executed in the following order:

<img src="http://i0.wp.com/dev.datasift.com/sites/default/files/usechunks1.png?w=660" alt="" data-recalc-dims="1" />

<p style="text-align: center;">
Fig 1: User Chunk ordering
</p>

The reason we pick only ‘n’ users to process is because we don’t want to penalize older queries if we suddenly get a lot of queries from users who are not in the user pool yet.  
<img src="http://i2.wp.com/dev.datasift.com/sites/default/files/queue_eval.jpg?w=660" alt="" data-recalc-dims="1" />

<p style="text-align: center;">
Fig 2: Queue evaluation
</p>

New user queries can enter the user pool in any one of the following ways. If the maximum user pool size ‘n’ has not been reached, they are simply added to the user pool. If the maximum user pool size 'n' has been reached, they have to wait. When the wait time is long, we say that the query is 'starved'. In order to address the problem of starvation, we introduced a starvation interval. If the wait time for a user has exceeded the starvation interval, then we increase the user pool size to accommodate this user. However we always revert back to the configured pool size once the starvation load drops.

Then, the user queues are evaluated and tickets are allocated for all the chunks in the user queues.

<img src="http://i2.wp.com/dev.datasift.com/sites/default/files/ticket_eval.jpg?w=660" alt="" data-recalc-dims="1" />

<p style="text-align: center;">
Fig 3: Ticket Evaluation
</p>

Once all the tickets are allocated, it's a simple case of picking the chunks with the lowest ticket numbers to run first. At this point, we check to see if there is a chunk without a ticket (a new one) that would query the same time period. If so, it is piggybacked with the chunk we just picked. This ensures we minimize I/O and reduce user wait times.

## Time estimation

We are now able to estimate how long it will take for a Hadoop job to complete. A user’s Historics query is broken into chunks that are then run as part of Hadoop jobs. The time it will take to complete an entire Historics query is the time it will take to complete the last chunk in its queue. The previous section detailed how tickets are assigned to each chunk. Estimating time then involves iterating over all the chunks with tickets and calculating and accumulating time for each of the chunks.

The estimated time for a job to complete depends on four main factors:

  1. Rule complexity: the more complex the rule(s), the longer the filtering engine will take to process the interactions.
  2. Job cardinality (number of chunks running together): if there are multiple chunks running in a job, it means there are multiple rules that the filtering engine has to load and apply.
  3. Sources being queried: higher volume sources take longer time to complete.
  4. Sample rate: a smaller sample rate means less I/O and fewer interactions to filter and, therefore, shorter time to get executed.

Currently, we lack enough information to take all these factors into account. But we have already introduced additional monitoring so that we can factor in all of the above when estimating the time it will take to complete a job. You can expect the job estimation times to become more accurate over going forward.

## Summary

While we are happy with the improvements we have made so far, we are also certain there is room for some more! We continue to analyze our Historics jobs, which will help us respond to any abnormalities more quickly and will help us improve our job estimation algorithms. We are also in the process of improving our message queues so that we can move the data through the rest of the pipeline faster. We are tweaking our filtering engine to further reduce the time it takes to get you the data you want. We look forward to making our processes faster and more robust.
