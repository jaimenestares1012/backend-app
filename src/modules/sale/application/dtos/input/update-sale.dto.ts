import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { CreateSaleDto } from './create-sale.dto';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
  @ApiProperty({
    example: '3cfce42c-9761-4cbd-a12c-da2ef94115a1',
    description: 'Id  del producto',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: '3cfce42c-9761-4cbd-a12c-da2ef94115a1',
    description: 'Id  del producto',
    required: true,
  })
  @IsString()
  idCustomer: string;

  @ApiProperty({
    example: '3cfce42c-9761-4cbd-a12c-da2ef94115a1',
    description: 'Id  del producto',
    required: true,
  })
  @IsString()
  idProduct: string;

  @ApiProperty({
    example: 21,
    description: 'Stock del producto',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  numberProducts?: number;
}
