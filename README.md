# AWS implementation using AWS Mobile
### This is an AWS implementation of ubiquity displays
This implementation stores the React code for the web application in S3 and retrieves it when the user loads the application in their browser.

AWS Services used:
* Amazon Cognito User Pools
* Amazon Cognito Federated Identities
* Amazon API Gateway
* AWS Lambda
* Amazon DynamoDB
* Amazon S3
* Amazon CloudFront

Our static content (React Web App) is stored in an S3 bucket served up to the client when called from the API gateway.
The client app calls the API gateway which calls the Lambdas to retrieve and respond with the display data stored in S3.
It uses AWS Cognito for user authentication, and AWSMobile hub which allows the serving of code from S3.

### installation
 ```bash
$ git clone https://
$ cd directory
$ npm install
 ```
 #### set up AWS cognito pool
 ####

awsmobile init
awsmobile features
awsmobile push

### Architecture Diagram
![](http://lenamendes.com/ubqdisplays/architecture.png)
