import { z } from 'zod';
import { PropertyModel } from './swagger.model';
import { getStringProperties } from './string-properties';
import { getNumberProperties } from './number-properties';
import { getObjectProperties } from './object-properties';
import { getEnumProperties } from './enum-properties';

export function getType(rule: z.ZodType): PropertyModel {
  if (rule instanceof z.ZodString) {
    const properties = getStringProperties(rule);
    return { type: 'string', ...properties };
  }

  if (rule instanceof z.ZodNumber) {
    const properties = getNumberProperties(rule);
    return { type: 'number', ...properties };
  }

  if (rule instanceof z.ZodOptional) {
    const type = getType(rule._def.innerType);
    return { required: false, ...type };
  }

  if (rule instanceof z.ZodDefault) {
    const type = getType(rule._def.innerType);
    return { ...type, default: rule._def.defaultValue(), required: false };
  }

  if (rule instanceof z.ZodNullable) {
    const type = getType(rule._def.innerType);
    if (type.enum && type.enum.length) {
      type.enum.push(null);
    }
    return { ...type, nullable: true };
  }

  if (rule instanceof z.ZodBoolean) {
    return { type: 'boolean' };
  }

  if (rule instanceof z.ZodArray) {
    const items = getType(rule._def.type);
    const len = rule._def.exactLength?.value;
    const minItems = len ? len : rule._def.minLength?.value;
    const maxItems = len ? len : rule._def.maxLength?.value;

    return { type: 'array', items, minItems, maxItems };
  }

  if (rule instanceof z.ZodObject) {
    const shape = rule._def.shape();
    const properties = getObjectProperties(shape);
    return { type: 'object', properties };
  }

  if (rule instanceof z.ZodRecord) {
    const properties = getType(rule._def.valueType);
    return { type: 'object', additionalProperties: properties };
  }

  if (rule instanceof z.ZodEnum) {
    const enumValue = rule._def.values;
    return { type: 'string', enum: enumValue };
  }

  if (rule instanceof z.ZodDate) {
    return { type: 'string', format: 'date-time' };
  }

  if (rule instanceof z.ZodNativeEnum) {
    return getEnumProperties(rule);
  }

  if (rule instanceof z.ZodEffects) {
    return getType(rule._def.schema);
  }

  if (rule instanceof z.ZodUnion) {
    const oneOf = rule._def.options.map((option: z.ZodType) => getType(option));
    const type = 'union'; // NestJS swagger decorator needs declared type
    return { type, oneOf };
  }

  if (rule instanceof z.ZodBigInt) {
    return { type: 'integer', format: 'int64' };
  }
}
