import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @ApiProperty({
    example: '8f72581d-9336-44b1-af51-b68cabcd715d',
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
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    example: '2024-01-01 12:00:00',
    description: 'es activo del producto',
  })
  @IsDate()
  updatedAt: Date;
}
