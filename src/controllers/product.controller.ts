import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductSaveDto } from '../dto/product-save.dto';
import { ApiTags } from '@nestjs/swagger';
import { Converters } from '../utils/convertsDTO';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiTags('Product')
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  @ApiTags('Product')
  save(@Body() product: ProductSaveDto) {
    return this.productService.save(Converters.productSaveToProduct(product));
  }

  @Get(':id')
  @ApiTags('Product')
  getById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Put(':id')
  @ApiTags('Product')
  update(@Param('id') id: string, @Body() product: ProductSaveDto) {
    return this.productService.edit(
      id,
      Converters.productSaveToProduct(product),
    );
  }

  @Delete(':id')
  @ApiTags('Product')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
