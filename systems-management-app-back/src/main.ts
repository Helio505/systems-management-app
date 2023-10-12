import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // whitelisted
  app.enableCors({
    // origin: 'http://localhost:3000',
    origin: "*", //ALERT: Change before production. Allows requests from any origin. Allows requests from Swagger Editor.
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Only allows properties that are defined in the DTO.
    }),
  );

  await app.listen(3333);
}
bootstrap();
