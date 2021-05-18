import * as aws from '@pulumi/aws'

import { administrator_role, developer_role, read_only_role } from './roles'

/* Role Policy Attachments */
// https://www.pulumi.com/docs/reference/pkg/aws/iam/rolepolicyattachment/
// pulumi import aws:iam/rolePolicyAttachment:RolePolicyAttachment administrator-administrator-access administrator/arn:aws:iam::aws:policy/AdministratorAccess

export const administrator_administrator_access = new aws.iam.RolePolicyAttachment(
  'administrator-administrator-access',
  {
    policyArn: 'arn:aws:iam::aws:policy/AdministratorAccess',
    role: administrator_role.name,
  },
  {
    protect: true,
  }
)

export const developer_power_user_access = new aws.iam.RolePolicyAttachment(
  'developer-power-user-access',
  {
    policyArn: 'arn:aws:iam::aws:policy/PowerUserAccess',
    role: developer_role.name,
  },
  {
    protect: true,
  }
)

export const read_only_read_only_access = new aws.iam.RolePolicyAttachment(
  'read-only-read-only-access',
  {
    policyArn: 'arn:aws:iam::aws:policy/ReadOnlyAccess',
    role: read_only_role.name,
  },
  {
    protect: true,
  }
)
