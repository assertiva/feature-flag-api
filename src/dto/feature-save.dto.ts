import { ApiProperty } from '@nestjs/swagger';

export class FeatureSaveDto {
  @ApiProperty({
    description: 'Nome da feature',
    required: true,
    type: String,
    example: 'planMigration',
  })
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
