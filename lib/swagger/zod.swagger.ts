import { z } from 'zod';
import { ZodDtoConstructor } from '../zod.class';
import { ApiProperty } from '@nestjs/swagger';
import { getType } from './get-type';

export function generateSwagger(Dto: ZodDtoConstructor<any>) {
  const schema = Dto._zodSchema() as z.AnyZodObject;
  for (const key in schema.shape) {
    const val = schema.shape[key];
    if (!val) continue;
    const type = getType(val);
    ApiProperty(type as any)(Dto.prototype, key);
  }
}
