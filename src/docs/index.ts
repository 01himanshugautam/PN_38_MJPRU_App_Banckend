import { serversInfo } from './servers.doc';
import { tagsInfo } from './tags.doc';
import { basicInfo } from './basic-info.doc';
import { componentConfig } from './component.doc';
import { apiDocs } from './api';

export const swaggerDocs = {
  ...basicInfo,
  ...serversInfo,
  ...tagsInfo,
  ...componentConfig,
  ...apiDocs,
  security: [{ bearerAuth: new Array<string>() }],
};
