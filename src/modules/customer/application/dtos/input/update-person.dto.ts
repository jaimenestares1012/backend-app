import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreatePersonDto } from './create-person.dto';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
  @ApiProperty({
    example: '8f72581d-9336-44b1-af51-b68cabcd715d',
    description: 'Id  del cliente',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: 'Manzanas',
    description: 'Nombre del cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    example: 'Manzanas',
    description: 'Apellido del cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    example: 'Manzanas',
    description: 'email del cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    example: 'Manzanas',
    description: 'phone del cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: 'Manzanas',
    description: 'documento del cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  document?: string;

  @ApiProperty({
    example: '9033355f-71af-4f1b-905b-63a09d3af418',
    description: 'ciudad del cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  idCity?: string;

  @ApiProperty({
    example: '16cb2a20-01e0-4a1d-bdab-884bf8108695',
    description: 'estado del cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  idComuna?: string;
}
