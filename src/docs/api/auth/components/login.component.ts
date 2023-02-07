export const loginComponent = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      description: 'Email',
      example: 'admin@1knetworks.com',
    },
    password: {
      type: 'string',
      description: 'Password',
      example: 'admin',
    },
  },
};
