import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto, RegisterDto } from './app.schemas';

@Controller()
export class AppController {
  @Post('register')
  registerUser(@Body() body: RegisterDto) {
    console.log(body);
    return body;
  }

  @Post('posts')
  createPost(@Body() body: CreatePostDto) {
    console.log(body);
    return body;
  }
}
