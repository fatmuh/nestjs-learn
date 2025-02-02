import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private zodType: ZodType) {}
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type == 'body') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.zodType.parse(value);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return value;
    }
  }
}
