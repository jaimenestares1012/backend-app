import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IComunaRepository } from '../../domain/repository/comuna.repository';
import { TcComunaEntity } from '../../domain/entities/public/comuna.entity';

@Injectable()
export class ComunaAdapter implements IComunaRepository {
  constructor() {}
  @InjectRepository(TcComunaEntity)
  private comunaRepository: Repository<TcComunaEntity>;

  async findData(): Promise<any> {
    return await this.comunaRepository.find();
  }
}
