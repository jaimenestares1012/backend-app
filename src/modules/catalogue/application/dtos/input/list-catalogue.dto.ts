import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
export class GetCatalogueDto {
  @ApiProperty({
    type: [String],
    description: 'List of Expedition Codes',
    example: ['cityList', 'comunaList', 'unitsMeasurementList', 'periodList'],
  })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  cataloguesCode: any[];
}
