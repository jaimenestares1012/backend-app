import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCustomerPersonDto {
  @ApiProperty({
    example: 'Jaime Alberto',
    description: 'Nombre del producto',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Nestares Enrriquez',
    description: 'Precio del producto',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'jaimenestares1012@gmail.com',
    description: 'Precio del producto',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '+51935556004',
    description: 'Precio del producto',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: '70066431',
    description: 'Precio del producto',
  })
  @IsString()
  document: string;

  @ApiProperty({
    example: '9033355f-71af-4f1b-905b-63a09d3af418',
    description: 'Precio del producto',
  })
  @IsString()
  idCity: string;

  @ApiProperty({
    example: '16cb2a20-01e0-4a1d-bdab-884bf8108695',
    description: 'Precio del producto',
  })
  @IsString()
  idComuna: string;
}
