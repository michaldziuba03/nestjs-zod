import { ZodString } from 'zod';
import { CheckKind, PropertyModel } from './swagger.model';

const strExamples: Partial<Record<CheckKind, string>> = {
  ip: '171.174.170.81',
  uuid: '123e4567-e89b-12d3-a456-426614174000',
  cuid: 'cjld2cjxh0000qzrmn831i7rn',
  cuid2: 'tz4a98xxat96iws9zmbrgj3a',
  url: 'http://example.com',
  email: 'johndoe@example.com',
  datetime: '2020-01-01T00:00:00.123Z',
  ulid: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
  emoji: '🍺',
};

export function getStringProperties(rule: ZodString): PropertyModel {
  const checks = rule._def.checks;
  if (!checks.length) return;

  const properties: PropertyModel = {};

  for (const check of checks) {
    switch (check.kind) {
      case 'max':
        properties.maxLength = check.value;
        break;
      case 'min':
        properties.minLength = check.value;
        break;
      case 'length':
        properties.maxLength = check.value;
        properties.minItems = check.value;
        break;
      case 'datetime':
        properties.format = 'date-time';
        break;
      case 'regex':
        properties.pattern = check.regex.source;
        break;
    }

    properties.example = strExamples[check.kind];
  }

  return properties;
}
