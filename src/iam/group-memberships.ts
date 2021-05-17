import * as aws from '@pulumi/aws'

import { administrators_group, developers_group } from './groups'
import { david_user } from './users'

/* Group membership */

// https://www.pulumi.com/docs/reference/pkg/aws/iam/groupmembership/
export const administrator_members = new aws.iam.GroupMembership('administrator-members', {
  users: [david_user.name],
  group: administrators_group.name,
})

export const developer_members = new aws.iam.GroupMembership('developer-members', {
  users: [david_user.name],
  group: developers_group.name,
})
