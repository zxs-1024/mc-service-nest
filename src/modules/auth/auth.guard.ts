import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.headers.token;
      console.log('request.headers.token: ', request.headers.token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.user = decoded; // 将解码后的用户信息添加到请求对象
      return true;
    } catch (error) {
      return false;
    }
  }
}
