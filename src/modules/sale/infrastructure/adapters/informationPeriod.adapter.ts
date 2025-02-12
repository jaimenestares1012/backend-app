import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IInformationPeriodRepository } from '../../domain/repository/informationPeriod.repository';
import { TbPeriodEntity } from '../../domain/entities/public/period.entity';

@Injectable()
export class InformationPeriodAdapter implements IInformationPeriodRepository {
  constructor() {}
  @InjectRepository(TbPeriodEntity)
  private periodRepository: Repository<TbPeriodEntity>;

  async findById(format: string): Promise<any> {
    const response = await this.periodRepository.findBy({
      month: format,
    });
    return response[0];
  }
  async createPeriod(data: any): Promise<any> {
    await this.periodRepository.save(this.periodRepository.create(data));
  }
}
