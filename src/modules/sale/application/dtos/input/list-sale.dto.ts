import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
export class ListSaleDto {
  @ApiProperty({
    example: 'f25e54b0-4af0-4708-bfe4-dbb86c939f9c',
    description: 'Medida del producto',
    required: false,
  })
  @IsString()
  @IsOptional()
  idUnitsMeasurement: string;

  @ApiProperty({
    example: 'f25e54b0-4af0-4708-bfe4-dbb86c939f9c',
    description: 'filtro por customer',
    required: false,
  })
  @IsString()
  @IsOptional()
  idCustomer: string;

  @ApiProperty({
    example: 'f25e54b0-4af0-4708-bfe4-dbb86c939f9c',
    description: 'filtro por producto',
    required: false,
  })
  @IsString()
  @IsOptional()
  idProduct: string;
}
