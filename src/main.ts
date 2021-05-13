import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { configSwagger } from './swagger';

(async () => {
  const app = await NestFactory.create(AppModule);
  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('swagger', app, documentSwagger);
  app.enableCors({
    origin: /http:\/\/localhost:[\d]{2,4}/,
  });
  await app.listen(5000);
})();
