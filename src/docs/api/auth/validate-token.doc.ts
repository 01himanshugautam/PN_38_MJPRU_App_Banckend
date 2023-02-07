export const validateTokenDocs = {
  post: {
    tags: ['Auth'],
    description: 'Validate Token',
    operationId: 'validate_token',
    parameters: new Array<string>(),
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ValidateToken',
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'Validate successfully',
      },
      '500': {
        description: 'Server error',
      },
    },
  },
};
