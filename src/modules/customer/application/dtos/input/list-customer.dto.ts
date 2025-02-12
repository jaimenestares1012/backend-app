import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
export class ListPersonDto {
  @ApiProperty({
    example: 'Jaime Alberto',
    description: 'Nombre del producto',
    required: false,
  })
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty({
    example: '9033355f-71af-4f1b-905b-63a09d3af418',
    description: 'Id de la ciudad',
    required: false,
  })
  @IsString()
  @IsOptional()
  idCity: string;

  @ApiProperty({
    example: '16cb2a20-01e0-4a1d-bdab-884bf8108695',
    description: 'Id de la comuna',
    required: false,
  })
  @IsString()
  @IsOptional()
  idComuna: string;

  @ApiProperty({
    example: '8f72581d-9336-44b1-af51-b68cabcd715d',
    description: 'Id de customer',
    required: false,
  })
  @IsString()
  @IsOptional()
  idCustomer: string;
}
