import { NotFoundException } from '@nestjs/common';

export class ProceedingsCodeNotFoundException extends NotFoundException {
  constructor(readonly message: string = 'Data no identificado') {
    super(message);
  }
}
