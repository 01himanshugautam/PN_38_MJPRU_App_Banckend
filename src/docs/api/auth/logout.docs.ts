export const logoutDocs = {
  get: {
    tags: ['Auth'],
    description: 'Logout',
    operationId: 'logout',
    security: [{ bearerAuth: new Array<string>() }],
    responses: {
      '200': {
        description: 'List of agents id and name fetch successfully',
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
