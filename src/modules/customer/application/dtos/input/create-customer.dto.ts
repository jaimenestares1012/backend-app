import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    example: '9033355f-71af-4f1b-905b-63a09d3af418',
    description: 'Precio del producto',
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: true,
    description: 'es activo del producto',
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    example: '2024-01-01 12:00:00',
    description: 'es activo del producto',
  })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    example: '2024-01-01 12:00:00',
    description: 'es activo del producto',
  })
  @IsDate()
  createdAt: Date;
}
