import { ZodNativeEnum } from 'zod';
import { PropertyModel } from './swagger.model';

export function getEnumProperties(rule: ZodNativeEnum<any>): PropertyModel {
  const enumValues = Object.values(rule._def.values);

  const numericValues = enumValues.filter((value) => typeof value === 'number');

  if (numericValues.length * 2 === enumValues.length) {
    return { type: 'number', enum: numericValues };
  }

  if (!numericValues.length) {
    return { type: 'string', enum: enumValues };
  }

  return { type: 'mixed', enum: enumValues };
}
