import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../models/product.model';
import { Model } from 'mongoose';
import { FeatureFlagService } from './featureFlag.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    private readonly featureFlagService: FeatureFlagService,
  ) {}

  async save(product: Product): Promise<Product> {
    const created = new this.productModel(product);
    return created.save();
  }

  async edit(id: string, product: Product): Promise<Product> {
    const found = await this.findById(id);

    if (!found) {
      throw 'Produto não encontrado';
    }

    await this.productModel.updateOne({ _id: id }, product).exec();
    return this.findById(id);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async delete(id: string) {
    await this.featureFlagService.deleteFlagsByProduct(id);
    return this.productModel.deleteOne({ _id: id }).exec();
  }
}
