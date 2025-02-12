import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IPeriodRepository } from '../../domain/repository/period.repository';
import { TbPeriodEntity } from '../../domain/entities/public/period.entity';

@Injectable()
export class PeriodAdapter implements IPeriodRepository {
  constructor() {}
  @InjectRepository(TbPeriodEntity)
  private unitsRepository: Repository<TbPeriodEntity>;

  async findData(): Promise<any> {
    return await this.unitsRepository.find();
  }
}
