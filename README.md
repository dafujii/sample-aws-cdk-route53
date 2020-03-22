# sample-aws-cdk-route53

AWS CDK ＋ TypeScript でサブドメインのホストゾーンを作成し、既存のホストゾーンとを紐づけるサンプルです。

詳しくは下記を見てください。

https://note.com/dafujii/n/ne1595c74bcc7

## Welcome to your CDK TypeScript project!

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`Route53Stack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

### Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
