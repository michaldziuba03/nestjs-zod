import { ZodStringCheck } from 'zod';

export interface PropertyModel {
  type?: string;
  format?: string;
  example?: any;
  required?: boolean;
  nullable?: boolean;
  default?: any;
  pattern?: string;
  items?: PropertyModel;
  properties?: PropertyModel;
  additionalProperties?: PropertyModel;
  minItems?: number;
  maxItems?: number;
  minLength?: number;
  maxLength?: number;
  maximum?: number;
  minimum?: number;
  enum?: Array<any>;
  oneOf?: Array<PropertyModel>;
}

export type CheckKind = ZodStringCheck['kind'];
