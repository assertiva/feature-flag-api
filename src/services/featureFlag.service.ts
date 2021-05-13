import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FeatureFlag, FeatureFlagDocument } from '../models/featureFlag.model';
import { Model } from 'mongoose';
import { Feature, FeatureDocument } from '../models/feature.model';
import { Product, ProductDocument } from '../models/product.model';
import { FeatureFlagFilterDto } from '../dto/featureFlag-filter.dto';

@Injectable()
export class FeatureFlagService {
  constructor(
    @InjectModel(FeatureFlag.name)
    private readonly featureFlagModel: Model<FeatureFlagDocument>,
    @InjectModel(Feature.name)
    private readonly featureModel: Model<FeatureDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async validateFeatureAndProduct(featureFlag: FeatureFlag) {
    const featureFound = await this.featureModel
      .findOne({ name: featureFlag.featureName })
      .exec();

    if (!featureFound) {
      throw 'Feature não encontrada!';
    }

    const productFound = await this.productModel
      .findOne({ name: featureFlag.productName })
      .exec();

    if (!productFound) {
      throw 'Produto não encontrado!';
    }

    return true;
  }

  async save(featureFlag: FeatureFlag): Promise<FeatureFlag> {
    await this.validateFeatureAndProduct(featureFlag);
    const created = new this.featureFlagModel(featureFlag);
    return created.save();
  }

  async findById(id: string): Promise<FeatureFlag> {
    return this.featureFlagModel.findById(id).exec();
  }

  async findAll() {
    return this.featureFlagModel.find().exec();
  }

  async findByFilter(
    featureFlagFilter: FeatureFlagFilterDto,
  ): Promise<FeatureFlag[]> {
    return this.featureFlagModel.find(featureFlagFilter).exec();
  }

  async edit(id: string, featureFlag: FeatureFlag): Promise<FeatureFlag> {
    const found = await this.findById(id);

    if (!found) {
      throw 'Feature Flag não encontrada!';
    }

    await this.validateFeatureAndProduct(featureFlag);
    await this.featureFlagModel.updateOne({ _id: id }, featureFlag);
    return this.findById(id);
  }

  async delete(id: string) {
    return this.featureFlagModel.deleteOne({ _id: id }).exec();
  }

  async deleteFlagsByProduct(productName: string) {
    return this.featureFlagModel.deleteMany({ productName }).exec();
  }

  async deleteFlagsByFeature(featureName: string) {
    return this.featureFlagModel.deleteMany({ featureName }).exec();
  }
}
