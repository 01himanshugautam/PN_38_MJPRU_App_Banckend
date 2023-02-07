/* eslint-disable max-len */

import { loginComponent } from './api/auth/components/login.component';

export const componentConfig = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Login: {
        ...loginComponent,
      },
    },
  },
};
