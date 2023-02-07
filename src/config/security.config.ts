import { Express } from 'express';

import helmet from 'helmet';
import hpp from 'hpp';

// eslint-disable-next-line
const xss = require('xss-clean');

export const securityConfig = function (app: Express) {
  // Set security HTTP headers
  app.use(helmet());

  // Data sanitization against XSS(clean user input from malicious HTML code)
  app.use(xss());

  // Prevent parameter pollution
  app.use(hpp());
};
