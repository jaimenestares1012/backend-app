import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export class ListProductDto {
  @ApiProperty({
    example: 'Manzanas',
    description: 'Nombre del producto',
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 3.0,
    description: 'Precio del producto',
    required: false,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  price: number;

  @ApiProperty({
    example: 'f25e54b0-4af0-4708-bfe4-dbb86c939f9c',
    description: 'Medida del producto',
    required: false,
  })
  @IsString()
  @IsOptional()
  idUnitsMeasurement: string;

  @ApiProperty({
    example: 21,
    description: 'Stock del producto',
    required: false,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  stock: number;
}
