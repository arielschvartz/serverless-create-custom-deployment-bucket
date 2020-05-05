# serverless-create-deployment-bucket

This is a simple plugin for [Serverless Framework](https://serverless.com/) to create the deployment bucket if the name was customized and bucket is not created yet.

## Install

```bash
$ npm install serverless-create-deployment-bucket --save-dev
```

Add the plugin to your `serverless.yml` file:

```yaml
plugins:
  - serverless-create-deployment-bucket
```

## Configure

The configuration of the plugin is done by simply configuring a custom bucketName on the serverless yml.

```yaml
provider:
  deployment:
    name: MY_DEPLOYMENT_BUCKET_NAME
```

That's it. It will be automatically created on sls package or sls deploy.