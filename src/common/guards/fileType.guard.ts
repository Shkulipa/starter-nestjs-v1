import { HttpException, HttpStatus } from '@nestjs/common';

export const fileTypeGuard = (fileType: string, availableTypes: string[]) => {
  if (!availableTypes.includes(fileType)) {
    const types = availableTypes.map((t) => '.' + t.split('/')[1]).join(', ');
    throw new HttpException(
      `Available types of file are ${types}`,
      HttpStatus.BAD_REQUEST,
    );
  }
};
