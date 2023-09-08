import { ZodNumber } from 'zod';
import { PropertyModel } from './swagger.model';

export function getNumberProperties(rule: ZodNumber): PropertyModel {
  const checks = rule._def.checks;
  if (!checks.length) return;

  const properties: PropertyModel = {};

  for (const check of checks) {
    if (check.kind === 'max') {
      properties.maximum = check.value;
    }

    if (check.kind === 'min') {
      properties.minimum = check.value;
    }

    if (check.kind === 'int') {
      properties.type = 'integer';
    }
  }

  return properties;
}
