export const loginDocs = {
  post: {
    tags: ['Auth'],
    description: 'Getting login credentials',
    operationId: 'login',
    parameters: new Array<string>(),
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Login',
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Login successfully',
        content: {
          'application/json': {},
        },
      },
      '500': {
        description: 'Server error',
      },
    },
  },
};
