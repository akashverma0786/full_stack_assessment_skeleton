import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', // Allow this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
  });

  await app.listen(3000);
}
bootstrap();
