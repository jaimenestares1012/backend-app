import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsWithinSixMonths } from '../../validations/IsWithinSixMonths.validate';

export class TreandDto {
  @ApiProperty({
    example: '2024-12',
    description: 'ID del cliente',
  })
  @IsString()
  startPeriod: string;

  @ApiProperty({
    example: '2025-01',
    description: 'ID del producto',
  })
  @IsString()
  @IsWithinSixMonths('startPeriod', {
    message: 'El endPeriod debe estar dentro de los 6 meses desde startPeriod',
  })
  endPeriod: string;
}
