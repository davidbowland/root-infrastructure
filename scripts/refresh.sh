#!/bin/sh

# Stop immediately on error
set -e

./scripts/assumeAdminRole.sh

# Refresh state with infrastructure
cd src/
pulumi refresh -s dev
