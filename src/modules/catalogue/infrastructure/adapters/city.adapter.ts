import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TcCityEntity } from '../../domain/entities/public/city.entity';
import { ICityRepository } from '../../domain/repository/city.repository';

@Injectable()
export class CityAdapter implements ICityRepository {
  constructor() {}
  @InjectRepository(TcCityEntity)
  private cityRepository: Repository<TcCityEntity>;

  async findData(): Promise<any> {
    return await this.cityRepository.find();
  }
}
