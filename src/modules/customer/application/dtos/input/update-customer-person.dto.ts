import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateCustomerPersonDto } from './create-customer-person.dto';

export class UpdateCustomerPersonDto extends PartialType(
  CreateCustomerPersonDto,
) {
  @ApiProperty({
    example: '8f72581d-9336-44b1-af51-b68cabcd715d',
    description: 'Id  del cliente',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'Jaime Alberto',
    description: 'Nombre del cliente',
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    example: 'Nestares Enrriquez',
    description: 'apellido del cliente',
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    example: 'jaimenestares1012@gmail.com',
    description: 'email del cliente',
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: '+51935556004',
    description: 'Phone del cliente',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    example: '70066431',
    description: 'Documento del cliente',
  })
  @IsString()
  @IsOptional()
  document: string;

  @ApiProperty({
    example: '9033355f-71af-4f1b-905b-63a09d3af418',
    description: 'Ciudad del cliente',
  })
  @IsString()
  @IsOptional()
  idCity: string;

  @ApiProperty({
    example: '16cb2a20-01e0-4a1d-bdab-884bf8108695',
    description: 'Estado del cliente',
  })
  @IsString()
  @IsOptional()
  idComuna: string;
}
