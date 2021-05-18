import * as aws from '@pulumi/aws'

import { administrators_group, developers_group } from './groups'
import {
  administrator_assume_roles,
  developer_assume_roles,
  manage_own_credentials,
  require_mfa,
} from './policies'

/* Group Policy Attachments */
// https://www.pulumi.com/docs/reference/pkg/aws/iam/grouppolicyattachment/
// pulumi import aws:iam/groupPolicyAttachment:GroupPolicyAttachment administrators-administrator-assume-roles Administrators/arn:aws:iam::494887012091:policy/administrator-assume-roles

// Administrators group

export const administrators_administrator_assume_roles = new aws.iam.GroupPolicyAttachment(
  'administrators-administrator-assume-roles',
  {
    group: administrators_group.name,
    policyArn: administrator_assume_roles.arn,
  },
  {
    protect: true,
  }
)

export const administrators_manage_own_credentials = new aws.iam.GroupPolicyAttachment(
  'administrators-manage-own-credentials',
  {
    group: administrators_group.name,
    policyArn: manage_own_credentials.arn,
  },
  {
    protect: true,
  }
)

export const administrators_require_mfa = new aws.iam.GroupPolicyAttachment(
  'administrators-require-mfa',
  {
    group: administrators_group.name,
    policyArn: require_mfa.arn,
  },
  {
    protect: true,
  }
)

// Developers group

export const developers_developer_assume_roles = new aws.iam.GroupPolicyAttachment(
  'developers-developer-assume-roles',
  {
    group: developers_group.name,
    policyArn: developer_assume_roles.arn,
  },
  {
    protect: true,
  }
)

export const developers_manage_own_credentials = new aws.iam.GroupPolicyAttachment(
  'developers-manage-own-credentials',
  {
    group: developers_group.name,
    policyArn: manage_own_credentials.arn,
  },
  {
    protect: true,
  }
)

export const developers_require_mfa = new aws.iam.GroupPolicyAttachment(
  'developers-require-mfa',
  {
    group: developers_group.name,
    policyArn: require_mfa.arn,
  },
  {
    protect: true,
  }
)
