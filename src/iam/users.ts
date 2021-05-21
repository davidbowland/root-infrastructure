import * as aws from '@pulumi/aws'

import { createdBy, createdFor } from '../vars'

/* Users */
// https://www.pulumi.com/docs/reference/pkg/aws/iam/user/
// pulumi import aws:iam/user:User david-user david

export const david_user = new aws.iam.User(
  'david-user',
  {
    forceDestroy: false,
    name: 'david',
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

export const adam_user = new aws.iam.User('adam-user', {
  forceDestroy: false,
  name: 'adam',
  path: '/',
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
})

export const svc_pulumi_admin = new aws.iam.User(
  'svc-pulumi-admin',
  {
    forceDestroy: false,
    name: 'svc_pulumi_admin',
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

export const svc_pulumi_developer = new aws.iam.User(
  'svc-pulumi-developer',
  {
    forceDestroy: false,
    name: 'svc_pulumi_developer',
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
