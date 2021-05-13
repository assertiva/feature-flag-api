import { ApiProperty } from '@nestjs/swagger';

export class FeatureFlagFilterDto {
  @ApiProperty({
    description: 'Nome de uma feature existente',
    required: false,
    type: String,
    example: '',
  })
  featureName?: string;

  @ApiProperty({
    description: 'Nome de um produto existente',
    required: false,
    type: String,
    example: '',
  })
  productName?: string;

  @ApiProperty({
    description: 'Flag para habilitar feature para este produto',
    required: false,
    default: false,
    example: false,
    type: Boolean,
  })
  active?: boolean;

  @ApiProperty({
    description: 'Quem pode utilizar a funcionalidade',
    required: false,
    default: [],
    example: ['1', 'admin'],
    type: [String],
  })
  canUse?: string[];

  @ApiProperty({
    description:
      'Você pode definir uma data para liberar o acesso a esse recurso de forma geral',
    required: false,
    default: null,
    type: String,
    example: '04/12/2022',
  })
  dateToIgnoreProps?: string;
}
