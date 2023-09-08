import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodDtoConstructor } from './zod.class';
import { ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const ZodClass = this.getMetatype(metadata);
    if (!ZodClass) {
      return value;
    }

    const schema = ZodClass._zodSchema();

    try {
      const result = await schema.parseAsync(value);
      return new ZodClass(result);
    } catch (error) {
      throw this.errorFactory(error);
    }
  }

  private getMetatype(metadata: ArgumentMetadata): ZodDtoConstructor<any> {
    const metatype = metadata.metatype as any;
    if (!metatype || !this.toValidate(metatype)) {
      return;
    }

    if (metatype._zodSchema) {
      return metatype as ZodDtoConstructor<any>;
    }

    return;
  }

  private toValidate(metadata: ArgumentMetadata): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metadata.metatype as any);
  }

  private errorFactory(err: unknown) {
    if (err instanceof ZodError) {
      const flatten = err.flatten();
      return new BadRequestException({
        error: 'Bad Request',
        statusCode: 400,
        message: 'Validation error',
        fields: flatten.fieldErrors,
      });
    }

    return err;
  }
}
