#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { Route53Stack } from '../lib/route53-stack';

const app = new cdk.App();
new Route53Stack(app, 'Route53Stack');
