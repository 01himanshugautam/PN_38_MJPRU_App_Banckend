import { ResponseLinks } from './response-links.interface';
import { ResponseMeta } from './response-meta.interface';

export interface ResponseData {
  data?: any;
  links?: ResponseLinks;
  meta?: ResponseMeta;
  message?: string;
}
