import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Manzanas',
    description: 'Nombre del producto',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 3.0,
    description: 'Precio del producto',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'f25e54b0-4af0-4708-bfe4-dbb86c939f9c',
    description: 'Medida del producto',
  })
  @IsString()
  idUnitsMeasurement: string;

  @ApiProperty({
    example: 21,
    description: 'Stock del producto',
  })
  @IsNumber()
  stock: number;
}
