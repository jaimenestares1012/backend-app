import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ISaleRepository } from '../../domain/repository/sale.repository';
import { TbSaleEntity } from '../../domain/entities/public/sale.entity';
import { CreateSaleDto } from '../../application/dtos/input/create-sale.dto';
import { UpdateSaleDto } from '../../application/dtos/input/update-sale.dto';
import { ListSaleDto } from '../../application/dtos/input/list-sale.dto';
import appQuery from '../querys/querys';

@Injectable()
export class SaleAdapter implements ISaleRepository {
  constructor() {}
  @InjectRepository(TbSaleEntity)
  private saleRepository: Repository<TbSaleEntity>;

  async findById(id: string): Promise<any> {
    const response = await this.saleRepository.findBy({
      id: id,
      isActive: true,
    });
    return response[0];
  }
  async createSale(data: CreateSaleDto): Promise<any> {
    console.log('data', data);
    await this.saleRepository.save(this.saleRepository.create(data));
  }
  async updateSale(data: UpdateSaleDto): Promise<any> {
    await this.saleRepository.update(data.id, data);
  }

  async listSale(data: ListSaleDto): Promise<any> {
    let query = appQuery.LIST_SALE;
    const conditions: string[] = [];
    conditions.push(` tbs.is_active = true`);
    if (data.idUnitsMeasurement) {
      conditions.push(` tcum.id = '${data.idUnitsMeasurement}'`);
    }
    if (data.idCustomer) {
      conditions.push(` tbs.id_customer = '${data.idCustomer}'`);
    }

    if (data.idProduct) {
      conditions.push(` tbs.id_product = '${data.idProduct}'`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ');
    }
    query += ` ORDER BY  tbs.created_at DESC`;
    console.log('query', query);

    const response = await this.saleRepository.query(query);
    return response;
  }
}
