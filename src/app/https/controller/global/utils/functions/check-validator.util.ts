export function checkValidator(validateFn: any, req: any, res: any, next: any) {
  if (validateFn(req.body).status == 401) {
    next(validateFn(req.body), req, res, next);
  }
}
