import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PeriodDto {
  @ApiProperty({
    example: '2024-12',
    description: 'ID del cliente',
  })
  @IsString()
  period: string;
}
