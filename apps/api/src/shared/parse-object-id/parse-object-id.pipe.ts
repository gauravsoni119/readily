import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string> {
  transform(value: string) {
    const isObjectId = mongoose.isValidObjectId(value);
    if (!isObjectId) {
      throw new BadRequestException('Validation failed (valid id expected)');
    }
    return value;
  }
}
