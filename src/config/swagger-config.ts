import { Express } from 'express';
import { swaggerDocs } from '../docs';

import swaggerUi from 'swagger-ui-express';
import basicAuth from 'express-basic-auth';

export const swaggerConfig = function (app: Express) {
  const password = process.env.SWAGGER_PASSWORD || 'supersecret';

  app.use(
    '/api-docs',
    basicAuth({
      users: { admin: password },
      challenge: true,
    }),
  );
  const options = {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
  };
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));
};
