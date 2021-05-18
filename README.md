# dbowland.com Development Infrastructure

Infrastructure as Code for dbowland.com resources for use by developers.

## Setup

The `administrator` role is required to deploy this project.

### Node / NPM

1. [Node 16](https://nodejs.org/en/)
1. [NPM 7+](https://www.npmjs.com/)

### Pulumi

This project is built using [Pulumi](https://www.pulumi.com/). Install the CLI using brew:

```bash
brew install pulumi
```

### AWS Credentials

To run locally, [AWS CLI](https://aws.amazon.com/cli/) is required in order to assume a role with permission to update resources. Install AWS CLI with:

```brew
brew install awscli
```

If file `~/.aws/credentials` does not exist, create it and add a default profile:

```toml
[default]
aws_access_key_id=<YOUR_ACCESS_KEY_ID>
aws_secret_access_key=<YOUR_SECRET_ACCESS_KEY>
region=us-east-2
```

If necessary, generate a [new access key ID and secret access key](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys).

Add a `administrator` profile to the same credentials file:

```toml
[administrator]
role_arn=arn:aws:iam::494887012091:role/administrator
source_profile=default
mfa_serial=<YOUR_MFA_ARN>
region=us-east-2
```

If necessary, retreive the ARN of the primary MFA device attached to the default profile:

```bash
aws iam list-mfa-devices --query 'MFADevices[].SerialNumber' --output text
```

## Developing Locally

When writing code from scratch, it can be useful to consult the [Pulumi AWS package reference](https://www.pulumi.com/docs/reference/pkg/aws/).

### Importing Existing Infrastructure

[Existing infrastructure can be imported](https://www.pulumi.com/docs/guides/adopting/import/) with:

```bash
pulumi import
```

### Preview Changes

Preview the changes the local code will make with:

```bash
npm run preview
```

If the `administrator` profile is not available, this command will fail.

### Deploying to Production

A preview will execute when a pull request is created to `master`. When the pull request is merged into `master`, the infrastructure will be automatically deployed to production.

In extreme cases, code can be deployed locally with:

```bash
npm run deploy
```

### Refreshing State with Infrastructure

If the state files becomes desynchronized from the infrastructure, it can be refreshed with:

```bash
npm run refresh
```

## Workflow

In order to execute or test the workflow locally, the `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` (probably set to `us-east-2`), and `GITHUB_TOKEN` environment variables must be defined. Use the [GitHub token page](https://github.com/settings/tokens) to generate a new token, if necessary.

### Testing the Workflow

Use [act](https://github.com/nektos/act) to test the GitHub workflow. Install it with:

```bash
brew install act
```

When running locally, workflow needs some secret values specified. If the necessary environment variables are declared, the secrets can be specified with:

```bash
npm run workflow:push
```

Or:

```bash
npm run workflow:pull_request
```

## Additional Documentation

- [AWS CLI](https://aws.amazon.com/cli/)

- [AWS credentials](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html)

- [Pulumi AWS package reference](https://www.pulumi.com/docs/reference/pkg/aws/)

- [Pulumi CLI](https://www.pulumi.com/docs/reference/cli/)

- [Pulumi import](https://www.pulumi.com/docs/reference/cli/pulumi_import/)

- [Pulumi refresh](https://www.pulumi.com/docs/reference/cli/pulumi_refresh/)

- [Pulumi unprotect](https://www.pulumi.com/docs/reference/cli/pulumi_state_unprotect/)

- [Importing existing infrastructure into Pulumi](https://www.pulumi.com/docs/guides/adopting/import/)
