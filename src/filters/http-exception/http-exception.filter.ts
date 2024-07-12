import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch(HttpException)
// 错误捕获器
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const message = exception.message || 'Internal server error';

    const errorResponse = {
      data:{
        error:message,
      },
      message:'请求失败',
      code:1,
      url:request.originalUrl // 错误的url地址
    }

    const status = exception instanceof HttpException?exception.getStatus():HttpStatus.INTERNAL_SERVER_ERROR;

    // 设置返回格式
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}