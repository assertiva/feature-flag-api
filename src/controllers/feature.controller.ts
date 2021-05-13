import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FeatureService } from '../services/feature.service';
import { FeatureSaveDto } from '../dto/feature-save.dto';
import { ApiTags } from '@nestjs/swagger';
import { Converters } from '../utils/convertsDTO';

@Controller('feature')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Post()
  @ApiTags('Feature')
  save(@Body() feature: FeatureSaveDto) {
    return this.featureService.save(Converters.featureSaveToFeature(feature));
  }

  @Get('')
  @ApiTags('Feature')
  findAll() {
    return this.featureService.findAll();
  }

  @Get(':id')
  @ApiTags('Feature')
  getById(@Param('id') id: string) {
    return this.featureService.findById(id);
  }

  @Put(':id')
  @ApiTags('Feature')
  updateFeature(@Param('id') id: string, @Body() feature: FeatureSaveDto) {
    return this.featureService.updateFeature(
      id,
      Converters.featureSaveToFeature(feature),
    );
  }

  @Delete(':id')
  @ApiTags('Feature')
  deleteFeature(@Param('id') id: string) {
    return this.featureService.delete(id);
  }
}
