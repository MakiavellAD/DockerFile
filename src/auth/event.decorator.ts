import { CanActivate, ExecutionContext, Injectable, UnauthorizedException,createParamDecorator } from "@nestjs/common";

export const TokenData = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    },
  );
