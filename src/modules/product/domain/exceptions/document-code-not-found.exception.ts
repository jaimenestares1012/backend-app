import { NotFoundException } from '@nestjs/common';

export class DocumentCodeNotFoundException extends NotFoundException {
  constructor(readonly message: string = 'Documento no identificado') {
    super(message);
  }
}
