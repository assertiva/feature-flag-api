import { DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
  .setTitle('Feature Flags API')
  .setDescription('API for manager the Features')
  .setVersion('1.0.0')
  .addTag('Product')
  .addTag('Feature')
  .addTag('Feature Flag')
  .build();
