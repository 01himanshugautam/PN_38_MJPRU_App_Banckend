import { Controller } from '@decorators/controller.decorator';
import { SuccessResponse } from '@decorators/success-response.decorator';
import { NoValidate, ValidateBody } from '@decorators/validate.decorator';
import { ResponseUtils } from '@https/controller/global/utils/class/response.utils';
import { UserService } from '@services/user.service';
import { Request } from 'express';
import Container from 'typedi';
import { LoginRequest } from './requests/login.request';
import { LoginResponse } from './responses/login.response';

@Controller()
export class AuthController {
  @SuccessResponse()
  @ValidateBody(LoginRequest)
  async login(loginRequest: LoginRequest) {
    const result = await Container.get(UserService).login(loginRequest);
    return new LoginResponse().map(result);
  }

  @SuccessResponse({ withMap: false })
  @NoValidate({ hasUser: true })
  async logout(req: Request, user: any) {
    const result = await Container.get(UserService).logout(req, user);
    return ResponseUtils.map({
      data: result.deletedCount,
      message: 'logout successfully',
    });
  }
}
