import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : 500;

    if (exception instanceof BadRequestException) {
      const msg = exception.getResponse()['message'] || exception.message;
      const message = Array.isArray(msg) ? msg.join(', ').trim() : msg;

      return response.status(statusCode).json({
        statusCode,
        message,
      });
    }

    return response.status(statusCode).json({
      statusCode,
      message: exception.message,
    });
  }
}
