#!/bin/sh

# Stop immediately on error
set -e

# Lint to catch syntax issues
npm run lint

./scripts/assumeAdminRole.sh

# This command generates a preview and gives a prompt before pushing changes
cd src/
pulumi up -s dev
