import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductRepository } from '../../domain/repository/product.repository';
import { TbProductEntity } from '../../domain/entities/public/produtcs';
import { CreateProductDto } from '../../application/dtos/input/create-product.dto';
import { UpdateProductDto } from '../../application/dtos/input/update-product.dto';
import { ListProductDto } from '../../application/dtos/input/list-product.dto';
import appQuery from '../querys/querys';

@Injectable()
export class ProductAdapter implements IProductRepository {
  constructor() {}
  @InjectRepository(TbProductEntity)
  private companyRepository: Repository<TbProductEntity>;
  async findById(id: string): Promise<any> {
    const response = await this.companyRepository.findBy({
      id,
      isActive: true,
    });
    return response[0];
  }

  async findByName(name: string): Promise<any> {
    const response = await this.companyRepository.findBy({
      name,
      isActive: true,
    });
    return response[0];
  }
  async createProduct(data: CreateProductDto): Promise<any> {
    await this.companyRepository.save(this.companyRepository.create(data));
  }
  async updateProduct(data: UpdateProductDto): Promise<any> {
    await this.companyRepository.update(data.id, data);
  }

  async listProduct(data: ListProductDto): Promise<any> {
    let query = appQuery.LIST_PRODUCTS;
    const conditions: string[] = [];
    conditions.push(` tbp.is_active = true`);
    if (data.name) {
      conditions.push(` tbp.name = '${data.name}'`);
    }
    if (data.idUnitsMeasurement) {
      conditions.push(` tcum.id = '${data.idUnitsMeasurement}'`);
    }
    if (data.price) {
      conditions.push(` tbp.price = '${data.price}'`);
    }
    if (data.stock) {
      conditions.push(` tbp.stock = '${data.stock}'`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ');
    }
    query += ` ORDER BY  tbp.created_at DESC`;
    const response = await this.companyRepository.query(query);
    return response;
  }
}
