import { Express } from 'express';
import basicAuth from 'express-basic-auth';

export default function statusMonitorConfig(app: Express) {
  const password = process.env.SWAGGER_PASSWORD || 'supersecret';

  app.use(
    '/status',
    basicAuth({
      users: { admin: password },
      challenge: true,
    }),
  );
  app.use(require('express-status-monitor')());
}
