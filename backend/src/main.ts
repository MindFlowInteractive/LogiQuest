import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { AllExceptionsFilter } from "./filters/all-exceptions.filter"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Existing configurations
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
  app.useGlobalFilters(new AllExceptionsFilter())

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("LogiQuest API")
    .setDescription(
      "API for managing LogiQuest, steps, and progress",
    )
    .setVersion("1.0")
    .addTag(
      "LogiQuest",
      "API endpoints for managing LogiQuest, steps, and progress",
    )
    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  // Start the server
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()

