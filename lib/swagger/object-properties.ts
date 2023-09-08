import { AnyZodObject } from 'zod';
import { getType } from './get-type';
import { PropertyModel } from './swagger.model';

export function getObjectProperties(shape: AnyZodObject): PropertyModel {
  const properties: PropertyModel = {};
  for (const key in shape) {
    const val = shape[key];
    if (!val) continue;
    const type = getType(val);
    if (!type) continue;
    properties[key] = type;
  }

  return properties;
}
