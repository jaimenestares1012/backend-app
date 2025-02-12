import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ISaleRepository } from '../../domain/repository/sale.repository';
import { TbSaleEntity } from '../../domain/entities/public/sale.entity';
import appQuery from '../querys/querys';
import { TreandDto } from '../../application/dtos/input/trend.dto';
import { PeriodDto } from '../../application/dtos/input/period';

@Injectable()
export class SaleAdapter implements ISaleRepository {
  constructor() {}
  @InjectRepository(TbSaleEntity)
  private saleRepository: Repository<TbSaleEntity>;

  async getPeriodTrend(data: TreandDto): Promise<any> {
    const query = appQuery.LIST_GET_TREND;
    const response = await this.saleRepository.query(query, [
      data.startPeriod,
      data.endPeriod,
    ]);
    return response;
  }

  async getProductSales(data: PeriodDto): Promise<any> {
    const query = appQuery.LIST_PRODUCTS_SALES;
    const response = await this.saleRepository.query(query, [data.period]);
    return response;
  }

  async getProductTrend(idProduct: string, data: TreandDto): Promise<any> {
    const query = appQuery.GET_PRODUCT_TREND;
    const response = await this.saleRepository.query(query, [
      idProduct,
      data.startPeriod,
      data.endPeriod,
    ]);
    console.log('response', response);
    return response;
  }

  async getCustomerSales(data: PeriodDto): Promise<any> {
    const query = appQuery.GET_SALES_CUSTOMER;
    const response = await this.saleRepository.query(query, [data.period]);
    console.log('response', response);
    return response;
  }

  async getCustomerTrend(idProduct: string, data: TreandDto): Promise<any> {
    const query = appQuery.GET_CUSTOMER_TREND;
    const response = await this.saleRepository.query(query, [
      idProduct,
      data.startPeriod,
      data.endPeriod,
    ]);
    console.log('response', response);
    return response;
  }

  async getTotalProductSales(): Promise<any> {
    const query = appQuery.GET_ALL_SALES_PRODUCTS;
    const response = await this.saleRepository.query(query);
    console.log('response', response);
    return response;
  }

  async getBestSelligProductPeriod(data: PeriodDto): Promise<any> {
    const query = appQuery.GET_BEST_SELLIG_PRODUCT;
    const response = await this.saleRepository.query(query, [data.period]);
    console.log('response', response);
    return response[0];
  }

  async getAmountSalePeriod(data: PeriodDto): Promise<any> {
    const query = appQuery.GET_AMOUNT_SALE_PERIOD;
    const response = await this.saleRepository.query(query, [data.period]);
    console.log('response', response);
    return response[0];
  }
  async getInfoPeriod(data: PeriodDto): Promise<any> {
    const query = appQuery.GET_INFO_PERIOD;
    const response = await this.saleRepository.query(query, [data.period]);
    console.log('response', response);
    return response[0];
  }
}
