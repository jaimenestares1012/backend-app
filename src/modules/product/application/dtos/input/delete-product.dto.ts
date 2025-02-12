import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteProductDto {
  @ApiProperty({
    example: '3cfce42c-9761-4cbd-a12c-da2ef94115a1',
    description: 'Id  del producto',
    required: true,
  })
  @IsString()
  id: string;
}
