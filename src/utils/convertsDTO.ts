import { ProductSaveDto } from '../dto/product-save.dto';
import { Product } from '../models/product.model';
import { FeatureSaveDto } from '../dto/feature-save.dto';
import { Feature } from '../models/feature.model';
import { FeatureFlagSaveDto } from '../dto/featureFlag-save.dto';
import { FeatureFlag } from '../models/featureFlag.model';

const productSaveToProduct = (product: ProductSaveDto): Product => {
  const productResult = new Product();
  productResult.name = product.name;
  return productResult;
};

const featureSaveToFeature = (feature: FeatureSaveDto): Feature => {
  const featureResult = new Feature();
  featureResult.name = feature.name;
  return featureResult;
};

const featureFlagSaveToFeatureFlag = (
  featureFlag: FeatureFlagSaveDto,
): FeatureFlag => {
  const result = new FeatureFlag();
  result.featureName = featureFlag.featureName;
  result.productName = featureFlag.productName;
  result.active = featureFlag.active;
  result.canUse = featureFlag.canUse;
  result.dateToIgnoreProps = featureFlag.dateToIgnoreProps;
  return result;
};

export const Converters = {
  productSaveToProduct,
  featureSaveToFeature,
  featureFlagSaveToFeatureFlag,
};
