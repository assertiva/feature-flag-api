import { ApiProperty } from '@nestjs/swagger';

export class ProductSaveDto {
  @ApiProperty({
    description: 'Nome do produto',
    required: true,
    type: String,
    example: 'Localize',
  })
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
