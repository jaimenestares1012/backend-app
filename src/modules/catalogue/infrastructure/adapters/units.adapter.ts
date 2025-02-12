import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUnitsRepository } from '../../domain/repository/units.repository';
import { TcUnitsMeasurementEntity } from '../../domain/entities/public/unit.entity';

@Injectable()
export class UnitsAdapter implements IUnitsRepository {
  constructor() {}
  @InjectRepository(TcUnitsMeasurementEntity)
  private unitsRepository: Repository<TcUnitsMeasurementEntity>;

  async findData(): Promise<any> {
    return await this.unitsRepository.find();
  }
}
