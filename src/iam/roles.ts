import * as aws from '@pulumi/aws'
import { all } from '@pulumi/pulumi'

import { david_user, adam_user } from './users'
import { createdBy, createdFor } from '../vars'

/* Roles */
// https://www.pulumi.com/docs/reference/pkg/aws/iam/role/
// pulumi import aws:iam/role:Role administrator-role administrator

export const administrator_role = new aws.iam.Role(
  'administrator-role',
  {
    assumeRolePolicy: david_user.arn.apply((davidUserArn) =>
      JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              AWS: davidUserArn,
            },
            Action: 'sts:AssumeRole',
          },
        ],
      })
    ),
    description: 'Administrator role with full access',
    forceDetachPolicies: false,
    maxSessionDuration: 3600,
    name: 'administrator',
    path: '/',
    tags: {
      'created-by': createdBy,
      'created-for': createdFor,
    },
  },
  {
    protect: true,
  }
)

export const developer_role = new aws.iam.Role(
  'developer-role',
  {
    assumeRolePolicy: all([david_user.arn, adam_user.arn]).apply(([davidUserArn, adamUserArn]) =>
      JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { AWS: [davidUserArn, adamUserArn] },
            Action: 'sts:AssumeRole',
          },
        ],
      })
    ),
    description: 'Power user access',
    forceDetachPolicies: false,
    maxSessionDuration: 3600,
    name: 'developer',
    path: '/',
    tags: {
      'created-by': createdBy,
      'created-for': createdFor,
    },
  },
  {
    protect: true,
  }
)

export const read_only_role = new aws.iam.Role(
  'read-only-role',
  {
    assumeRolePolicy: all([david_user.arn, adam_user.arn]).apply(([davidUserArn, adamUserArn]) =>
      JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              AWS: [davidUserArn, adamUserArn],
            },
            Action: 'sts:AssumeRole',
          },
        ],
      })
    ),
    description: 'Read-only access to all services',
    forceDetachPolicies: false,
    maxSessionDuration: 3600,
    name: 'read-only',
    path: '/',
    tags: {
      'created-by': createdBy,
      'created-for': createdFor,
    },
  },
  {
    protect: true,
  }
)
