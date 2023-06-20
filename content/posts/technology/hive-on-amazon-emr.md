---
author: Jairam
categories:
- Technology
date: "2011-09-08T00:00:00Z"
tags:
- Amazon
- Amazon EMR
- Bigdata
- EMR
- Hadoop
- Hadoop Analytics
- Hive
- NoSql
title: Hive on Amazon EMR
---
There are quite a few resources out there that can help you with running Hive on Amazon EMR. I decided to write this more as a reference for myself than anything else. But I do hope it helps people out there.

Please note that these instructions are for :

  - A linux machine and I expect them to be quite similar for a Mac or a Windows (with a linux API layer like Cygwin)
  - Using Amazon EMR via the command line. There are other ways you can use EMR, like Amazon's web interface.

## Setting up Amazon EMR

**Step 1** : Create an Amazon AWS account with Amazon and enable your account for Amazon Elastic Map-Reduce.

What you should expect to get out of this step are the following -

  - Access-id
  - Private Key
  - Key-Pair file (your private key to ssh) with a key-pair name (which you would have given at the time of creating the account


This step will require authentication and verification (can do it over the phone) with Amazon.


**Step 2** : Install dependencies

```sh
  apt-get install ruby libopenssl-ruby
```  


**Step 3** : Download the Elastic Map Reduce Ruby client into a folder

```sh
mkdir emr
cd emr
wget http://elasticmapreduce.s3.amazonaws.com/elastic-mapreduce-ruby.zip
unzip elastic-mapreduce-ruby.zip
```

Put the credentials (key-pair file) in the same folder as the elastic map reduce files. Create a file called _credentials.json_ if it does not already exist in the same folder where you unzipped the ruby client.

The credentials.json file should look like this -

``` json
{
    "access-id": "xxxxxxxxxxxxxxxxxxxx",
    "private-key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "key-pair": "my-key-pair",
    "key-pair-file": "key-pair-file.pem",
    "log-uri": "s3://my-bucket/logs"
}
```


And that's it, you are ready to run Elastic Map-Reduce on Amazon. EMR instances have support for the following -

- Hive
- Pig
- Custom Map-Reduce Jobs
- Built-in capability to read from Amazon S3

## Frequently Used Commands

All the below commands should be run from inside the folder where you unzipped the Ruby client.

#### List all the current jobs

```./elastic-mapreduce --list```  

#### List all the current active jobs

```./elastic-mapreduce --list --active```  

#### Get help/documentation

```./elastic-mapreduce --help```  

#### Start a Hive instance

**Interactive Mode**

```sh
./elastic-mapreduce --create --name "${JOB_NAME}" 
   --hive-interactive --num-instances ${EMR_INSTANCES_NUM}
   --master-instance ${EMR_INSTANCES_TYPE} --alive
```


This should echo out a job name like “j-VENCHH7KKB32”. Select the instance types and number of machines carefully for optimal usage vs cost ratio.<sup>[1](#references)</sup> This will look for the credentials file in the same folder. There are options that you can use to override the defaults. See EMR help (previous command) for documentation.

**Script Mode**

```sh
./elastic-mapreduce --create
    --hive-script --args ${EMR_SCRIPT_PATH}
    --args -d,OUTPUT_PATH=${OUTPUT_LOCATION_S3}
    --name "${JOB_NAME}"
    --num-instances ${EMR_INSTANCES_NUM}
    --instance-type ${EMR_INSTANCES_TYPE}
    --credentials ${EMR_CREDENTIALS_FILE})
```

#### Logging into your Hive instance

```./elastic-mapreduce --ssh 'j-VENCHH7KKB32'```

Once you are logged in, you might want to install _screen_ as any network glitch might kill your session.

```sudo apt-get install screen```

Just type `hive` once you are logged in and you are good to run Hive.

#### Add nodes to currently running job instance

```sh
./elastic-mapreduce --add-instance-group TASK 
    --instance-count 4 --instance-type m2.4xlarge 
    --jobflow 'j-VENCHH7KKB32'
```

The above will add a new instance group - TASK.

**UPDATE:** Turns out that you can add nodes only to job instances that were started with at least 2 nodes.

There are three different kinds of instance groups -

- Master
  - Manages the job flow. Coordinates the distribution of the MR executable and subsets of the raw data, to the core and tas[1] instance groups.<sup>[2](#references)</sup>
- Core
  - Contains all of the core nodes of a job flow. A core node is an EC2 instance that runs Hadoop map and reduce tasks and stores data using the Hadoop Distributed File System (HDFS). Core nodes are managed by the master node.<sup>[2](#references)</sup>
- Task
  - Contains all of the task nodes in a job flow. The task instance group is optional. You can add it when you start the job flow or add a task instance group to a job flow in progress.<sup>[2](#references)</sup>


If you want to add more machines to an existing instance group use the below command &#8211;

```sh
    <pre>./elastic-mapreduce --modify-instance-group TASK 
      --instance-count 4 --instance-type m2.4xlarge 
      --jobflow 'j-VENCHH7KKB32'</pre>
```

#### Terminating a job instance

```./elastic-mapreduce —terminate 'j-VENCHH7KKB32'```

### Useful Links

- [Amazon Elastic Map Reduce Documentation](http://docs.amazonwebservices.com/ElasticMapReduce/latest/API/)
- [Amazon Elastic MapReduce Ruby Client Documentation](http://aws.amazon.com/developertools/2264)

### References
[1] [Amazon Instance Types](http://aws.amazon.com/ec2/instance-types/)
[2] [Amazon Instance Groups](http://docs.amazonwebservices.com/ElasticMapReduce/latest/DeveloperGuide/)
