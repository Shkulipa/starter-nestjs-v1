import { HttpException, HttpStatus, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

export class IsObjectIdPipe implements PipeTransform {
  async transform(id: string) {
    const isValidId = Types.ObjectId.isValid(id);
    if (!isValidId)
      throw new HttpException("Param id isn't valid", HttpStatus.BAD_REQUEST);
    return id;
  }
}
