import { z } from 'zod';
import { createDto, generateSwagger } from '../../lib';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  age: z.number().int().default(18),
});

export class RegisterDto extends createDto(registerSchema) {}
generateSwagger(RegisterDto);

const createPostSchema = z.object({
  title: z.string().min(3).max(64),
  content: z.string().max(500).optional(),
});

enum Role {
  MEMBER,
  ADMIN,
  OWNER,
}

export class CreatePostDto extends createDto(createPostSchema) {}
generateSwagger(CreatePostDto);

const complexSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3).max(64),
  bio: z.string().max(100).default('my default value'),
  email: z.string().email(),
  role: z.nativeEnum(Role),
  addresses: z.array(z.string().max(100).nonempty()).max(10).nonempty(),
  links: z
    .array(
      z.object({
        logo: z.enum(['twitter', 'facebook', 'tiktok']),
        link: z.string().url(),
        nestedObj: z.object({ key: z.string() }),
      }),
    )
    .max(5),
  hashmap: z.record(z.number()).optional(),
  createdAt: z.string().datetime(),
});

export class ComplexSchemaDto extends createDto(complexSchema) {}
generateSwagger(ComplexSchemaDto);
