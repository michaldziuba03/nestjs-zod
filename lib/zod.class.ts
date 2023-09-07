import { z } from 'zod';

export type ZodDtoConstructor<T extends z.ZodObject<any, any, any>> = {
  new (input: z.infer<T>): z.infer<T>;
  _zodSchema(): T;
};

export function createDto<T extends z.ZodObject<any, any, any>>(schema: T) {
  return class {
    constructor(input: z.infer<T>) {
      for (const key in input) {
        this[key as string] = input[key];
      }
    }

    static _zodSchema() {
      return schema;
    }
  } as ZodDtoConstructor<T>;
}
