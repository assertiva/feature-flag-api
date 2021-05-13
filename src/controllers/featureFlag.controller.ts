import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FeatureFlagService } from '../services/featureFlag.service';
import { FeatureFlagSaveDto } from '../dto/featureFlag-save.dto';
import { Converters } from '../utils/convertsDTO';
import { ApiTags } from '@nestjs/swagger';
import { FeatureFlagFilterDto } from '../dto/featureFlag-filter.dto';

@Controller('feature-flag')
export class FeatureFlagController {
  constructor(private readonly featureFlagService: FeatureFlagService) {}

  @Post()
  @ApiTags('Feature Flag')
  save(@Body() featureFlag: FeatureFlagSaveDto) {
    console.log(featureFlag);
    return this.featureFlagService.save(
      Converters.featureFlagSaveToFeatureFlag(featureFlag),
    );
  }

  @Get()
  @ApiTags('Feature Flag')
  findAll() {
    return this.featureFlagService.findAll();
  }

  @Post('filter')
  @ApiTags('Feature Flag')
  findByFilter(@Body() filter: FeatureFlagFilterDto) {
    return this.featureFlagService.findByFilter(filter);
  }

  @Put(':id')
  @ApiTags('Feature Flag')
  update(@Param('id') id: string, @Body() featureFlag: FeatureFlagSaveDto) {
    return this.featureFlagService.edit(
      id,
      Converters.featureFlagSaveToFeatureFlag(featureFlag),
    );
  }

  @Delete(':id')
  @ApiTags('Feature Flag')
  delete(@Param('id') id: string) {
    return this.featureFlagService.delete(id);
  }
}
