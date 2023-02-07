// import { CHANNEL } from '@utils/constant/communication.constant';
import { Response } from 'express';
import { IResponseConfig } from '../interfaces/response-config.interface';
import { GridTableResponse } from '../interfaces/response/grid-table-response.interface';
import { IPageData } from '../interfaces/response/page-data.interface';
import { ResponseData } from '../interfaces/response/response-data.interface';
import PaginationResponse from './pagination.response';

export class ResponseUtils {
  public static customSuccess(res: Response, result: any = null, resConfig?: IResponseConfig): any {
    const statusCode = 200;
    this.send(res, statusCode, result, resConfig);
  }

  public static success(res: Response, result: any = null, resConfig?: IResponseConfig): any {
    const statusCode = 200;
    const data: any = this.map({ data: result });
    this.send(res, statusCode, data, resConfig);
  }

  public static map(responseData: ResponseData): ResponseData {
    return responseData;
  }

  public static groupBy(arrayData: any[], key: string) {
    return arrayData.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  public static paginate(results: IPageData): GridTableResponse {
    return PaginationResponse.map(results);
  }

  public static send(res: Response, statusCode: number, data: any, resConfig?: IResponseConfig) {
    if (resConfig && resConfig.attachment) {
      res.attachment(resConfig.attachment);
    }
    if (resConfig && resConfig.contentType) {
      res.setHeader('Content-Type', resConfig.contentType);
    }
    res.status(statusCode).send(data);
  }
}
