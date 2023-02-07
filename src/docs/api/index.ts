import { loginDocs } from './auth/login.doc';
import { logoutDocs } from './auth/logout.docs';

export const apiDocs = {
  paths: {
    // Auth
    '/v1/login': loginDocs,
    '/v1/logout': logoutDocs,
  },
};
