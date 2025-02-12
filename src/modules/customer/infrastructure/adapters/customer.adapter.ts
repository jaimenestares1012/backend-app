import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICustomerRepository } from '../../domain/repository/customer.repository';
import { TbCustomerEntity } from '../../domain/entities/public/customer.entity';
import { CreateCustomerDto } from '../../application/dtos/input/create-customer.dto';
import { UpdateCustomerDto } from '../../application/dtos/input/update-customer.dto';

@Injectable()
export class CustomerAdapter implements ICustomerRepository {
  constructor() {}
  @InjectRepository(TbCustomerEntity)
  private companyRepository: Repository<TbCustomerEntity>;

  async createCustomer(data: CreateCustomerDto): Promise<any> {
    await this.companyRepository.save(this.companyRepository.create(data));
  }
  async updateCustomer(data: UpdateCustomerDto): Promise<any> {
    console.log('CustomerAdapter', data);
    await this.companyRepository.update(data.id, data);
  }
}
