'use strict';

const BbPromise = require('bluebird');

class CreateDeploymentBucket {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.hooks = {
      // this is where we declare the hook we want our code to run
      'after:package:initialize': () => BbPromise.bind(this).then(this.createDeploymentBucket)
    }

    // bindings
    this.log = this.log.bind(this)
  }

  log(msg) {
    this.serverless.cli.log(msg)
  }

  get awsCredentials() {
    return {
      ...this.serverless.providers.aws.getCredentials(),
      region: this.awsRegion,
    }
  }

  get awsRegion() {
    return this.serverless.providers.aws.getRegion();
  }

  get awsProfile() {
    return this.serverless.providers.aws.getProfile();
  }

  get s3() {
    if (!this._s3) {
      this._s3 = new this.serverless.providers.aws.sdk.S3({
        ...this.awsCredentials,
        apiVersion: '2006-03-01',
      });
    }

    return this._s3;
  }

  async createDeploymentBucket() {
    this.log('create-deployment-bucket: Starting up...')

    const bucketName = this.serverless.service.provider.deploymentBucket;
    try {
      await this.s3.headBucket({
        Bucket: bucketName,
      }).promise();
      this.log(`create-deployment-bucket: Bucket already created!`);
    } catch (error) {
      await this.s3.createBucket({
        Bucket: bucketName,
      }).promise();
      this.log(`create-deployment-bucket: Bucket created successfully!`);
    }
  }
}

module.exports = CreateDeploymentBucket;
