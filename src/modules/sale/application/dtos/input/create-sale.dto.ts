import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID } from 'class-validator';

export class CreateSaleDto {
  @ApiProperty({
    example: '8f72581d-9336-44b1-af51-b68cabcd715d',
    description: 'ID del cliente',
  })
  @IsUUID()
  idCustomer: string;

  @ApiProperty({
    example: 'dc174d62-78f2-4f4e-8507-a5cc971f8d01',
    description: 'ID del producto',
  })
  @IsUUID()
  idProduct: string;

  @ApiProperty({
    example: 2,
    description: 'Cantidad de productos en la venta',
  })
  @IsInt()
  numberProducts: number;
}
