export const signupDocs = {
  post: {
    tags: ['Auth'],
    description: 'Registering new users',
    operationId: 'signup',
    parameters: new Array<string>(),
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CreateUser',
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'Signup successfully',
      },
      '500': {
        description: 'Server error',
      },
    },
  },
};
