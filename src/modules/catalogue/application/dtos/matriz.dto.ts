import { ControllerResponse } from '@src/modules/shared/interface/controller-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty } from 'class-validator';

export class ArraysDto {
  @ApiProperty({
    example: [1, 2, 3],
    description: 'Matriz de números',
  })
  @IsArray()
  @ArrayNotEmpty()
  array1: number[];

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Matriz de números',
  })
  @IsArray()
  @ArrayNotEmpty()
  array2: number[];
}

export class CreateCompanyResponseDto extends ControllerResponse {
  data: any;
}
