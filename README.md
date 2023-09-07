# NestJS Zod Pipe

> This library is very experimental

Use Zod validator with NestJS.

## Usage

### Register Zod Pipe globally

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from '../lib/zod.pipe';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ZodValidationPipe());

  await app.listen(3000);
}
```

### Define Zod schemas and DTOs

```ts
import { z } from 'zod';
import { createDto } from '@md03/nestjs-zod';

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
```

### Use DTOs in Controller

```ts
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto, RegisterDto } from './app.schemas';

@Controller()
export class AppController {
  @Post('register')
  registerUser(@Body() body: RegisterDto) {
    return body;
  }

  @Post('posts')
  createPost(@Body() body: CreatePostDto) {
    return body;
  }
}
```

## HTTP Error example

For now it's not possible to customize HTTP response error.

```json
{
 "fields": {
  "title": [
   "String must contain at least 3 character(s)"
  ]
 },
 "error": "Bad Request",
 "statusCode": 400
}
```
