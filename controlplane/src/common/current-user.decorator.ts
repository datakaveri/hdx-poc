import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthUser } from './authz';

export const CurrentUser = createParamDecorator((_: unknown, ctx: ExecutionContext): AuthUser | undefined => {
  return ctx.switchToHttp().getRequest().user;
});
