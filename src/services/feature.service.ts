import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feature, FeatureDocument } from '../models/feature.model';
import { Model } from 'mongoose';
import { FeatureFlagService } from './featureFlag.service';

@Injectable()
export class FeatureService {
  constructor(
    @InjectModel(Feature.name)
    private readonly featureModel: Model<FeatureDocument>,
    private readonly featureFlagService: FeatureFlagService,
  ) {}

  async save(feature: Feature): Promise<Feature> {
    const created = new this.featureModel(feature);
    return created.save();
  }

  async delete(id: string) {
    await this.featureFlagService.deleteFlagsByFeature(id);
    return this.featureModel.deleteOne({ _id: id }).exec();
  }

  async findById(id: string): Promise<Feature> {
    return this.featureModel.findById(id).exec();
  }

  async updateFeature(id: string, feature: Feature): Promise<Feature> {
    const found = await this.featureModel.findById(id).exec();

    if (!found) {
      throw 'Feature não encontrada!';
    }

    await this.featureModel.updateOne({ _id: id }, feature).exec();
    return this.findById(id);
  }

  async findAll() {
    return this.featureModel.find().exec();
  }
}
