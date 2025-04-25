import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { SecurityMiddleware } from './security/security.middleware';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  // Security headers
  app.use(helmet());

  // Security middleware

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  //global interceptors
  app.useGlobalInterceptors(
    new TransformResponseInterceptor(),
    new LoggingInterceptor()
  );

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('LogiQuest API')
    .setDescription('API for managing LogiQuest, steps, and progress')
    .setVersion('1.0')
    .addTag('Users', 'User management and profile operations')
    .addTag('Auth', 'Authentication and authorization')
    .addTag('Puzzles', 'Quiz and puzzle management')
    .addTag('Steps', 'Individual quiz step management')
    .addTag('GameSessions', 'Quiz session tracking and management')
    .addTag('Achievements', 'User achievement tracking')
    .addTag('Transactions', 'Blockchain transaction management')
    .addTag('Categories', 'Quiz category management')
    .addTag('Progress', 'User progress tracking')
    .addTag('Leaderboards', 'Competitive ranking systems')
    .addTag('Lifelines', 'Quiz assistance mechanisms')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
