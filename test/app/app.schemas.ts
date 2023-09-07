import { z } from 'zod';
import { createDto } from '../../lib';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  age: z.number().int().default(18),
});

export class RegisterDto extends createDto(registerSchema) {}

const createPostSchema = z.object({
  title: z.string().min(3).max(64),
  content: z.string().max(500).optional(),
});

export class CreatePostDto extends createDto(createPostSchema) {}
