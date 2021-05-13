import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class FeatureFlag {
  @Prop({ required: true })
  featureName: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: false, default: false })
  active?: boolean;

  @Prop({ required: false, default: [] })
  canUse?: string[];

  @Prop({ required: false, type: String })
  dateToIgnoreProps?: string;
}

export type FeatureFlagDocument = FeatureFlag & Document;
export const FeatureFlagSchema = SchemaFactory.createForClass(FeatureFlag);
