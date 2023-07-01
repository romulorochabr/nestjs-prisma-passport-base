import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { PasswordSanitizerInterceptor } from './interceptors/password.sanitizer.interceptor';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // Global Interceptors
  app.useGlobalInterceptors(new PasswordSanitizerInterceptor());

  // API Versioning
  app.setGlobalPrefix('v1');
  app.enableVersioning({
    type: VersioningType.URI,
  });
    
  // Swagger
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Para Todos')
    .setDescription('The Para Todos API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  // enable DI for class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  
  await app.listen(3000);
}
bootstrap();