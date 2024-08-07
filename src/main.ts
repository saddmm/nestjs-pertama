import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: [
      "http://localhost:5500",
      "http://127.0.0.1:5500"
  ]})
  await app.listen(3000);
}
bootstrap();
