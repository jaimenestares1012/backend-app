import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeletSaleDto {
  @ApiProperty({
    example: '3cfce42c-9761-4cbd-a12c-da2ef94115a1',
    description: 'Id  de la venta',
    required: true,
  })
  @IsString()
  id: string;
}
