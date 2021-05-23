import * as aws from '@pulumi/aws'
import { all } from '@pulumi/pulumi'

import { administrator_role, developer_role, read_only_role } from './roles'
import { createdBy, createdFor } from '../vars'

/* Policies */
// https://www.pulumi.com/docs/reference/pkg/aws/iam/policy/
// pulumi import aws:iam/policy:Policy administrator-assume-role arn:aws:iam::494887012091:policy/administrator-assume-role

export const administrator_assume_roles = new aws.iam.Policy(
  'administrator-assume-roles',
  {
    description: 'Assume administrator roles',
    name: 'administrator-assume-roles',
    path: '/',
    policy: all([administrator_role.arn, developer_role.arn, read_only_role.arn]).apply(
      ([administratorRoleArn, developerRoleArn, readOnlyRoleArn]) =>
        JSON.stringify({
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Action: ['iam:Get*', 'iam:List*'],
              Resource: '*',
            },
            {
              Effect: 'Allow',
              Action: 'sts:AssumeRole',
              Resource: [administratorRoleArn, developerRoleArn, readOnlyRoleArn],
            },
          ],
        })
    ),
    tags: {
      'created-by': createdBy,
      'created-for': createdFor,
    },
  },
  {
    protect: true,
  }
)

export const developer_assume_roles = new aws.iam.Policy(
  'developer-assume-roles',
  {
    description: 'Assume developer or read-only roles',
    name: 'developer-assume-roles',
    path: '/',
    policy: all([developer_role.arn, read_only_role.arn]).apply(
      ([developerRoleArn, readOnlyRoleArn]) =>
        JSON.stringify({
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Action: ['iam:Get*', 'iam:List*'],
              Resource: '*',
            },
            {
              Effect: 'Allow',
              Action: 'sts:AssumeRole',
              Resource: [developerRoleArn, readOnlyRoleArn],
            },
          ],
        })
    ),
    tags: {
      'created-by': createdBy,
      'created-for': createdFor,
    },
  },
  {
    protect: true,
  }
)

export const deny_root_iam_access = new aws.iam.Policy(
  'deny-root-iam-access',
  {
    description: 'Deny access to root IAM resources',
    name: 'deny-root-iam-access',
    path: '/',
    policy: JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Deny',
          Action: 'iam:*',
          Resource: [
            'arn:aws:iam::494887012091:group/Administrators',
            'arn:aws:iam::494887012091:group/Developers',
            'arn:aws:iam::aws:policy/AdministratorAccess',
            'arn:aws:iam::aws:policy/IAMFullAccess',
          ],
        },
        {
          Effect: 'Deny',
          Action: 'iam:*',
          Resource: '*',
          Condition: {
            StringEquals: {
              'iam:ResourceTag/created-for': 'root',
            },
          },
        },
      ],
    }),
    tags: {
      'created-by': createdBy,
      'created-for': createdFor,
    },
  },
  {
    protect: true,
  }
)

export const manage_own_credentials = new aws.iam.Policy(
  'manage-own-credentials',
  {
    description:
      'Allows users to manage their own credentials including changing their password and setting up MFA.',
    name: 'manage-own-credentials',
    path: '/',
    policy: JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'AllowViewAccountInfo',
          Effect: 'Allow',
          Action: ['iam:GetAccountPasswordPolicy', 'iam:ListVirtualMFADevices'],
          Resource: '*',
        },
        {
          Sid: 'AllowManageOwnPasswords',
          Effect: 'Allow',
          Action: ['iam:ChangePassword', 'iam:GetUser'],
          Resource: 'arn:aws:iam::*:user/${aws:username}',
        },
        {
          Sid: 'AllowManageOwnAccessKeys',
          Effect: 'Allow',
          Action: [
            'iam:CreateAccessKey',
            'iam:DeleteAccessKey',
            'iam:ListAccessKeys',
            'iam:UpdateAccessKey',
          ],
          Resource: 'arn:aws:iam::*:user/${aws:username}',
        },
        {
          Sid: 'AllowManageOwnSigningCertificates',
          Effect: 'Allow',
          Action: [
            'iam:DeleteSigningCertificate',
            'iam:ListSigningCertificates',
            'iam:UpdateSigningCertificate',
            'iam:UploadSigningCertificate',
          ],
          Resource: 'arn:aws:iam::*:user/${aws:username}',
        },
        {
          Sid: 'AllowManageOwnSSHPublicKeys',
          Effect: 'Allow',
          Action: [
            'iam:DeleteSSHPublicKey',
            'iam:GetSSHPublicKey',
            'iam:ListSSHPublicKeys',
            'iam:UpdateSSHPublicKey',
            'iam:UploadSSHPublicKey',
          ],
          Resource: 'arn:aws:iam::*:user/${aws:username}',
        },
        {
          Sid: 'AllowManageOwnGitCredentials',
          Effect: 'Allow',
          Action: [
            'iam:CreateServiceSpecificCredential',
            'iam:DeleteServiceSpecificCredential',
            'iam:ListServiceSpecificCredentials',
            'iam:ResetServiceSpecificCredential',
            'iam:UpdateServiceSpecificCredential',
          ],
          Resource: 'arn:aws:iam::*:user/${aws:username}',
        },
        {
          Sid: 'AllowManageOwnVirtualMFADevice',
          Effect: 'Allow',
          Action: ['iam:CreateVirtualMFADevice', 'iam:DeleteVirtualMFADevice'],
          Resource: 'arn:aws:iam::*:mfa/${aws:username}',
        },
        {
          Sid: 'AllowManageOwnUserMFA',
          Effect: 'Allow',
          Action: [
            'iam:DeactivateMFADevice',
            'iam:EnableMFADevice',
            'iam:ListMFADevices',
            'iam:ResyncMFADevice',
          ],
          Resource: 'arn:aws:iam::*:user/${aws:username}',
        },
      ],
    }),
    tags: {
      'created-by': createdBy,
      'created-for': createdFor,
    },
  },
  {
    protect: true,
  }
)

export const require_mfa = new aws.iam.Policy(
  'require-mfa',
  {
    description:
      'Makes the account require MFA but DOES NOT GRANT THE ABILITY TO ADD MFA OR CHANGE PASSWORD.',
    name: 'require-mfa',
    path: '/',
    policy: JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'DenyAllExceptListedIfNoMFA',
          Effect: 'Deny',
          NotAction: [
            'iam:ChangePassword',
            'iam:CreateVirtualMFADevice',
            'iam:EnableMFADevice',
            'iam:GetUser',
            'iam:ListMFADevices',
            'iam:ListVirtualMFADevices',
            'iam:ResyncMFADevice',
            'sts:GetSessionToken',
          ],
          Resource: '*',
          Condition: {
            BoolIfExists: {
              'aws:MultiFactorAuthPresent': 'false',
            },
          },
        },
      ],
    }),
    tags: {
      'created-by': createdBy,
      'created-for': createdFor,
    },
  },
  {
    protect: true,
  }
)
