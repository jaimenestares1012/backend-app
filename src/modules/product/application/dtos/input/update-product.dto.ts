import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { CreateProductDto } from './create-product.dto'; // Importa tu DTO de creación

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    example: '3cfce42c-9761-4cbd-a12c-da2ef94115a1',
    description: 'Id  del producto',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'Manzanas',
    description: 'Nombre del producto',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 3.0,
    description: 'Precio del producto',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    example: 'f25e54b0-4af0-4708-bfe4-dbb86c939f9c',
    description: 'Medida del producto',
    required: false,
  })
  @IsOptional()
  @IsString()
  idUnitsMeasurement?: string;

  @ApiProperty({
    example: 21,
    description: 'Stock del producto',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  stock?: number;
}
