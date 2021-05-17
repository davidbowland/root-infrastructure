import * as aws from '@pulumi/aws'

/* User Groups */
// https://www.pulumi.com/docs/reference/pkg/aws/iam/group/
// pulumi import aws:iam/group:Group administrators-group Administrators

export const administrators_group = new aws.iam.Group(
  'administrators-group',
  {
    name: 'Administrators',
    path: '/',
  },
  {
    protect: true,
  }
)

export const developers_group = new aws.iam.Group(
  'developers-group',
  {
    name: 'Developers',
    path: '/',
  },
  {
    protect: true,
  }
)
