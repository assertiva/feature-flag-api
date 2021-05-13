import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Feature, FeatureSchema } from './models/feature.model';
import { Product, ProductSchema } from './models/product.model';
import { FeatureFlag, FeatureFlagSchema } from './models/featureFlag.model';

import { ProductService } from './services/product.service';
import { FeatureService } from './services/feature.service';
import { FeatureFlagService } from './services/featureFlag.service';

import { ProductController } from './controllers/product.controller';
import { FeatureController } from './controllers/feature.controller';
import { FeatureFlagController } from './controllers/featureFlag.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Feature.name, schema: FeatureSchema },
      { name: Product.name, schema: ProductSchema },
      { name: FeatureFlag.name, schema: FeatureFlagSchema },
    ]),
  ],
  controllers: [ProductController, FeatureController, FeatureFlagController],
  providers: [ProductService, FeatureService, FeatureFlagService],
})
export class AppModule {}
