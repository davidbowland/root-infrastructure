#!/usr/bin/env bash

# Stop immediately on error
set -e

if [[ -z "$1" ]]; then
  $(./scripts/assumeAdminRole.sh)
fi

# Deploy infrastructure

sam deploy --stack-name root-infrastructure \
  --template-file template.yaml --region us-east-2 \
  --capabilities CAPABILITY_NAMED_IAM \
  --no-fail-on-empty-changeset \
  --confirm-changeset
