---
title: Hive on Amazon EMR
author: Jairam
layout: post
permalink: /2011/09/hive-on-amazon-emr/
yourls_shorturl:
  - http://url.jairam.me/n
  - http://url.jairam.me/n
original_post_id:
  - 176
  - 176
categories:
  - Technology
tags:
  - Amazon
  - Amazon EMR
  - Bigdata
  - EMR
  - Hadoop
  - Hadoop Analytics
  - Hive
  - NoSql
---
There are quite a few resources out there that can help you with running Hive on Amazon EMR. I decided to write this more as a reference for myself than anything else. But I do hope it helps people out there.

Please note that these instructions are for :

  * A linux machine and I expect them to be quite similar for a Mac or a Windows (with a linux API layer like Cygwin)
  * Using Amazon EMR via the command line. There are other ways you can use EMR, like Amazon&#8217;s web interface.

## Setting up Amazon EMR

**Step 1** : Create an Amazon AWS account with Amazon and enable your account for Amazon Elastic Map-Reduce.

What you should expect to get out of this step are the following &#8211;

  * Access-id
  * Private Key
  * Key-Pair file (your private key to ssh) with a key-pair name (which you would have given at the time of creating the account

<div>
  This step will require authentication and verification (can do it over the phone) with Amazon.
</div>

<div>
  <strong>Step 2</strong> : Install dependencies
</div>

<div>
  <pre><code>apt-get install ruby libopenssl-ruby</code></pre>
  
  <p>
    <strong>Step 3</strong> : Download the Elastic Map Reduce Ruby client into a folder
  </p>
  
  <pre><code>mkdir emr</code>
<code>cd emr </code>
<code>wget http://elasticmapreduce.s3.amazonaws.com/elastic-mapreduce-ruby.zip</code>
<code>unzip elastic-mapreduce-ruby.zip</code></pre>
  
  <p>
    Put the credentials (key-pair file) in the same folder as the elastic map reduce files. Create a file called <em>credentials.json</em> if it does not already exist in the same folder where you unzipped the ruby client.
  </p>
  
  <p>
    The credentials.json file should look like this &#8211;
  </p>
  
  <pre>{
    "access-id": "xxxxxxxxxxxxxxxxxxxx",
    "private-key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "key-pair": "my-key-pair",
    "key-pair-file": "key-pair-file.pem",
    "log-uri": "s3://my-bucket/logs"
}</pre>
  
  <p>
    And that&#8217;s it, you are ready to run Elastic Map-Reduce on Amazon. EMR instances have support for the following &#8211;
  </p>
  
  <ul>
    <li>
      Hive
    </li>
    <li>
      Pig
    </li>
    <li>
      Custom Map-Reduce Jobs
    </li>
    <li>
      Built-in capability to read from Amazon S3
    </li>
  </ul>
  
  <h2>
    Frequently Used Commands
  </h2>
  
  <p>
    All the below commands should be run from inside the folder where you unzipped the Ruby client.
  </p>
  
  <p>
    <span class="Apple-style-span" style="font-size:10px;letter-spacing:1px;line-height:26px;text-transform:uppercase;">List all the current jobs</span>
  </p>
  
  <pre><code>./elastic-mapreduce --list&lt;code></code>&lt;/code></pre>
  
  <h3>
    List all the current active jobs
  </h3>
  
  <pre><code>./elastic-mapreduce --list --active</code></pre>
  
  <h3>
    Get help/documentation
  </h3>
  
  <pre><code>./elastic-mapreduce --help</code></pre>
  
  <h3>
    Start a Hive instance
  </h3>
  
  <h4>
    Interactive Mode
  </h4>
  
  <pre>./elastic-mapreduce --create --name "${JOB_NAME}" 
     --hive-interactive --num-instances ${EMR_INSTANCES_NUM}
     --master-instance ${EMR_INSTANCES_TYPE} --alive</pre>
  
  <p>
    This should echo out a job name like “j-VENCHH7KKB32”. Select the instance types and number of machines carefully for optimal usage vs cost ratio.<sup><a href="#references">[1]</a> </sup>This will look for the credentials file in the same folder. There are options that you can use to override the defaults. See EMR help (previous command) for documentation.
  </p>
  
  <h4>
    Script Mode
  </h4>
  
  <pre>./elastic-mapreduce --create 
    --hive-script --args ${EMR_SCRIPT_PATH} 
    --args -d,OUTPUT_PATH=${OUTPUT_LOCATION_S3} 
    --name "${JOB_NAME}" 
    --num-instances ${EMR_INSTANCES_NUM} 
    --instance-type ${EMR_INSTANCES_TYPE} 
    --credentials ${EMR_CREDENTIALS_FILE})</pre>
  
  <h3>
    Logging into your Hive instance
  </h3>
  
  <pre> ./elastic-mapreduce --ssh 'j-VENCHH7KKB32'</pre>
  
  <p>
    Once you are logged in, you might want to install <em>screen</em> as any network glitch might kill your session.
  </p>
  
  <pre> sudo apt-get install screen</pre>
  
  <p>
    Just type <em>Hive </em>once you are logged in and you are good to run Hive.
  </p>
  
  <h3>
    Add nodes to currently running job instance
  </h3>
  
  <pre>./elastic-mapreduce --add-instance-group TASK 
      --instance-count 4 --instance-type m2.4xlarge 
      --jobflow 'j-VENCHH7KKB32'</pre>
  
  <p>
    The above will add a new instance group &#8211; TASK.
  </p>
  
  <p>
    <strong>UPDATE: </strong>Turns out that you can add nodes only to job instances that were started with at least 2 nodes &#8211; See <a href="http://url.jairam.me/2a">http://url.jairam.me/2a</a>
  </p>
  
  <p>
    There are three different kinds of instance groups &#8211;
  </p>
  
  <ul>
    <li>
      Master
    </li>
    <ul>
      <li>
        Manages the job flow. Coordinates the distribution of the MR executable and subsets of the raw data, to the core and task instance groups. <sup><a href="#references">[2]</a></sup>
      </li>
    </ul>
    
    <li>
      Core
    </li>
    <ul>
      <li>
        Contains all of the core nodes of a job flow. A core node is an EC2 instance that runs Hadoop map and reduce tasks and stores data using the Hadoop Distributed File System (HDFS). Core nodes are managed by the master node.<sup><a href="#references">[2]</a></sup>
      </li>
    </ul>
    
    <li>
      Task
    </li>
    <ul>
      <li>
        Contains all of the task nodes in a job flow. The task instance group is optional. You can add it when you start the job flow or add a task instance group to a job flow in progress.<sup><a href="#references">[2]</a></sup>
      </li>
    </ul>
  </ul>
  
  <div>
    If you want to add more machines to an existing instance group use the below command &#8211;
  </div>
  
  <div>
    <pre>./elastic-mapreduce --modify-instance-group TASK 
      --instance-count 4 --instance-type m2.4xlarge 
      --jobflow 'j-VENCHH7KKB32'</pre>
  </div>
  
  <h3>
    Terminating a job instance
  </h3>
  
  <pre>./elastic-mapreduce —terminate 'j-VENCHH7KKB32'</pre>
  
  <h2>
    Useful Links
  </h2>
  
  <ul>
    <li>
      <a title="Amazon Elastic Map Reduce Documentation" href="http://docs.amazonwebservices.com/ElasticMapReduce/latest/API/" target="_blank">Amazon Elastic Map Reduce Documentation</a>
    </li>
    <li>
      <a title="Amazon Elastic MapReduce Ruby Client Documentation" href="http://aws.amazon.com/developertools/2264" target="_blank">Amazon Elastic MapReduce Ruby Client Documentation</a>
    </li>
  </ul>
  
  <div>
    <h2>
      <a name="references"></a><span class="Apple-style-span" style="color:#000000;">References</span>
    </h2>
    
    <p>
      [1] <a href="http://aws.amazon.com/ec2/instance-types/" target="_blank">Amazon Instance Types</a><br /> [2] <a href="http://docs.amazonwebservices.com/ElasticMapReduce/latest/DeveloperGuide/" target="_blank">Amazon Instance Groups</a>
    </p>
  </div>
</div>