import * as route53 from "@aws-cdk/aws-route53";
import * as cdk from "@aws-cdk/core";
import { Duration } from "@aws-cdk/core";

const env = {
  region: process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT
};

export class Route53Stack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props ? props : { env });

    const hostedZone = new route53.PublicHostedZone(this, "HostedZone", {
      zoneName: "cdk.dafujii.ga",
      comment: "Created from cdk"
    });

    new route53.ARecord(this, "Record", {
      zone: hostedZone,
      recordName: "www",
      target: {
        values: ["127.0.0.1"]
      },
      ttl: Duration.seconds(300),
      comment: "Created from cdk"
    });

    const parent = route53.HostedZone.fromLookup(this, "ParentHostedZone", {
      domainName: "dafujii.ga."
    });

    if (!hostedZone.hostedZoneNameServers) {
      throw new Error("NS record is undefined.");
    }

    new route53.ZoneDelegationRecord(this, "NS", {
      zone: parent,
      recordName: "cdk",
      nameServers: hostedZone.hostedZoneNameServers,
      comment: "Created from cdk"
    });
  }
}
