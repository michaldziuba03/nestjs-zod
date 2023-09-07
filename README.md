<div align="center">
  <img src="https://github.com/michaldziuba03/nestjs-zod/assets/43048524/14578191-4e0a-4ee0-8780-93d86afdaa51">
</div>

# NestJS Zod Pipe

> This library is in experimental stage of development.

Zod pipe for NestJS framework. Replacement for default `class-validator`. 

## Installation

> Library is not available in npm registry yet.

```sh
# with npm:
npm install zod @md03/nestjs-zod
# with pnpm:
pnpm add zod @md03/nestjs-zod
# with yarn:
yarn add zod @md03/nestjs-zod
```

## Usage

### Register Zod Pipe globally

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from '@md03/nestjs-zod';

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

For now it's not possible to customize HTTP response error shape.

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

## License
Distributed under the MIT License. See `LICENSE` for more information.
