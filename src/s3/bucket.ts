import * as aws from '@pulumi/aws'

import { createdBy, createdFor } from '../vars'

/* S3 Buckets */
// https://www.pulumi.com/docs/reference/pkg/aws/s3/bucket/

export const dbowland_lambda_source_bucket = new aws.s3.Bucket('dbowland-lambda-source', {
  acl: 'private',
  bucket: 'dbowland-lambda-source',
  lifecycleRules: [
    {
      enabled: true,
      noncurrentVersionExpiration: {
        days: 15,
      },
    },
  ],
  versioning: {
    enabled: true,
  },
  tags: {
    'created-by': createdBy,
    'created-for': createdFor,
  },
})
