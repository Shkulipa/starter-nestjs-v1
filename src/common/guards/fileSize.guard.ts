import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

export const fileSizeGuard = (fileSize: number, maxSize: number) => {
  if (fileSize > maxSize)
    throw new HttpException(
      `Max size of file is ${maxSize / 10e6}MB`,
      HttpStatus.BAD_REQUEST,
    );
};
