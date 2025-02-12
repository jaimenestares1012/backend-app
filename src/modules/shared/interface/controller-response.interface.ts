import { RESPONSE_CODE } from '@src/modules/shared/interface/enum';
import { ApiProperty } from '@nestjs/swagger';

export class ControllerResponse<T = any> {
  @ApiProperty({
    description: 'Response code',
    example: '00',
  })
  responseCode: RESPONSE_CODE;

  @ApiProperty({
    description: 'Description of the response code',
    example: 'Response message',
  })
  message?: string;

  @ApiProperty({
    description: 'Data',
    example: {},
  })
  data?: T;
}
