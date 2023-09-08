import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from '../../lib';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('App example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('app')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ZodValidationPipe());

  await app.listen(3000);
}
