import { expect as expectCDK, haveResource } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import Route53 = require("../lib/route53-stack");

const env = {
  region: "1234567890123",
  account: "ap-northeast-1"
};

test("cdk.dafujii.ga のホストゾーンが作成できているか", () => {
  const app = new cdk.App();
  const stack = new Route53.Route53Stack(app, "MyTestStack", { env });

  expectCDK(stack).to(
    haveResource("AWS::Route53::HostedZone", {
      Name: "cdk.dafujii.ga.",
      HostedZoneConfig: {
        Comment: "Created from cdk"
      }
    })
  );
});

test("cdk.dafujii.ga のホストゾーン内にサブドメインwwwの127.0.0.1の値を持ったAレコードが追加されているか", () => {
  const app = new cdk.App();
  const stack = new Route53.Route53Stack(app, "MyTestStack", { env });

  expectCDK(stack).to(
    haveResource("AWS::Route53::RecordSet", {
      Comment: "Created from cdk",
      HostedZoneId: {
        Ref: "HostedZoneDB99F866"
      },
      Name: "www.cdk.dafujii.ga.",
      ResourceRecords: ["127.0.0.1"],
      TTL: "300",
      Type: "A"
    })
  );
});

test("dafujii.ga のホストゾーン内にcdkのNSレコードが追加されているか", () => {
  const app = new cdk.App();
  const stack = new Route53.Route53Stack(app, "MyTestStack", { env });

  expectCDK(stack).to(
    haveResource("AWS::Route53::RecordSet", {
      Name: "cdk.dafujii.ga.",
      Type: "NS",
      Comment: "Created from cdk",
      HostedZoneId: "DUMMY",
      ResourceRecords: {
        "Fn::GetAtt": ["HostedZoneDB99F866", "NameServers"]
      },
      TTL: "172800"
    })
  );
});
