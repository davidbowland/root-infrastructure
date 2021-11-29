import * as aws from '@pulumi/aws'

// https://www.pulumi.com/docs/reference/pkg/aws/iam/group/

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
