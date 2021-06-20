import * as aws from '@pulumi/aws'

import { svc_pulumi_admin, svc_pulumi_developer } from './users'

/* User Policy Attachments */
// https://www.pulumi.com/docs/reference/pkg/aws/iam/userpolicyattachment/

export const svc_pulumi_admin_attach = new aws.iam.UserPolicyAttachment('svc-pulumi-admin-attach', {
  user: svc_pulumi_admin.name,
  policyArn: aws.iam.ManagedPolicy.AdministratorAccess,
})

export const svc_pulumi_developer_attach = new aws.iam.UserPolicyAttachment('svc-pulumi-developer-attach', {
  user: svc_pulumi_developer.name,
  policyArn: aws.iam.ManagedPolicy.PowerUserAccess,
})
