import { ResponseMetaLinks } from './response-meta-links.interface';

export interface ResponseMeta {
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  links: ResponseMetaLinks;
  path: string;
  total: number;
  page_title: string;
}
