export const options = {
  endPoint: 'host.docker.internal',
  port: 9000,
  useSSL: false,
  accessKey: 'access_key',
  secretKey: 'secret123',
};

export const BUCKET_NAME = 'pdfs';

export const policy = {
  Version: '2012-10-17',
  Statement: [
    {
      Effect: 'Allow',
      Principal: {
        AWS: [
          '*',
        ],
      },
      Action: [
        's3:GetBucketLocation',
        's3:ListBucket',
        's3:ListBucketMultipartUploads',
      ],
      Resource: [
        'arn:aws:s3:::pdfs',
      ],
    },
    {
      Effect: 'Allow',
      Principal: {
        AWS: [
          '*',
        ],
      },
      Action: [
        's3:ListMultipartUploadParts',
        's3:PutObject',
        's3:AbortMultipartUpload',
        's3:DeleteObject',
        's3:GetObject',
      ],
      Resource: [
        'arn:aws:s3:::pdfs/*',
      ],
    },
  ],
};
