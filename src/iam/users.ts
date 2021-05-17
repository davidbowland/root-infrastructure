import * as aws from '@pulumi/aws'

import { createdBy, createdFor } from '../vars'

/* Users */

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
