import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ISaleService } from '../../domain/interfaces/sale-service.interface';
import {
  TB_INFORMARTION_PERIOD_REPOSITORY,
  TB_SALE_REPOSITORY,
} from '../../providers.token';
import { CreateSaleDto } from '../dtos/input/create-sale.dto';
import { ProductResponseDto } from '../dtos/output/product.response';
import { RESPONSE_CODE } from '@src/modules/shared/interface/enum';
import { v4 as uuidv4 } from 'uuid';
import { UpdateSaleDto } from '../dtos/input/update-sale.dto';
import { DeletSaleDto } from '../dtos/input/delete-sale.dto';
import { ListSaleDto } from '../dtos/input/list-sale.dto';
import { ISaleRepository } from '../../domain/repository/sale.repository';
import { TB_PRODUCT_REPOSITORY } from '@src/modules/product/providers.token';
import { IProductRepository } from '@src/modules/product/domain/repository/product.repository';
import { CustomBadRequestException } from '@src/modules/shared/exceptions/Exception';
import { IInformationPeriodRepository } from '../../domain/repository/informationPeriod.repository';
import { TB_PERSON_REPOSITORY } from '@src/modules/customer/providers.token';
import { IPersonRepository } from '@src/modules/customer/domain/repository/person.repository';

@Injectable()
export class SaleService implements ISaleService {
  constructor() {}
  @Inject(TB_SALE_REPOSITORY)
  private saleRepository: ISaleRepository;
  @Inject(TB_INFORMARTION_PERIOD_REPOSITORY)
  private informationPeriodRepository: IInformationPeriodRepository;
  @Inject(TB_PRODUCT_REPOSITORY)
  private productRepository: IProductRepository;
  @Inject(TB_PERSON_REPOSITORY)
  private personRepository: IPersonRepository;
  async createSale(data: CreateSaleDto): Promise<ProductResponseDto> {
    try {
      const product = await this.productRepository.findById(data.idProduct);
      const customer = await this.personRepository.listPersonAndCustomer({
        idCustomer: data.idCustomer,
        search: null,
        idCity: null,
        idComuna: null,
      });
      if (!customer[0]) {
        throw new BadRequestException('Customer does not exist');
      }
      if (!product) {
        throw new BadRequestException('Product already exists');
      }
      if (product.stock - data.numberProducts < 0) {
        throw new BadRequestException('insufficient products');
      }
      const currentDate = new Date();
      const yearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
      // const yearMonth = `2025-01`;
      let period = await this.informationPeriodRepository.findById(yearMonth);
      if (!period) {
        await this.informationPeriodRepository.createPeriod({
          id: uuidv4(),
          month: yearMonth,
          demanda: 0,
          meta: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        period = await this.informationPeriodRepository.findById(yearMonth);
      }
      const newSale = {
        idCustomer: data.idCustomer,
        idProduct: data.idProduct,
        amount: product.price * data.numberProducts,
        numberProducts: data.numberProducts,
        idInformationPeriod: period.id,
        id: uuidv4(),
        isActive: true,
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      await this.saleRepository.createSale(newSale);
      await this.productRepository.updateProduct({
        id: data.idProduct,
        stock: product.stock - data.numberProducts,
      });
      return {
        responseCode: RESPONSE_CODE.SUCCESS,
        message: 'Ok',
        data: 'sale',
      };
    } catch (error) {
      if (error instanceof CustomBadRequestException) {
        throw error;
      }
      throw new CustomBadRequestException(RESPONSE_CODE.ERROR, error.message);
    }
  }

  async updateSale(data: UpdateSaleDto): Promise<ProductResponseDto> {
    // IMPLEMENTAR LOGICA DE UPDATE VENTA
    // OBTENER LA DATA DE LA VENTA
    // HACER UN CALCULO LAS EXISTENCIAS DE LA VENTA Y LA CANTIDAD DE PRODUCTOS
    // ACTUALIZAR LA VENTA
    // RETORNAR LA VENTA ACTUALIZADA

    const updateProduct = {
      ...data,
      updatedAt: new Date(),
    };
    const product = await this.saleRepository.updateSale(updateProduct);
    return {
      responseCode: RESPONSE_CODE.SUCCESS,
      message: 'Ok',
      data: product,
    };
  }

  async deleteSale(data: DeletSaleDto): Promise<ProductResponseDto> {
    const updateProduct = {
      isActive: false,
      id: data.id,
      updatedAt: new Date(),
    };
    const product = await this.saleRepository.updateSale(updateProduct);
    return {
      responseCode: RESPONSE_CODE.SUCCESS,
      message: 'Ok',
      data: product,
    };
  }

  async listSale(query: ListSaleDto): Promise<ProductResponseDto> {
    const sales = await this.saleRepository.listSale(query);
    return {
      responseCode: RESPONSE_CODE.SUCCESS,
      message: 'Ok',
      data: sales.map((sale) => {
        return {
          id: sale.id,
          idCustomer: sale.id_customer,
          idProduct: sale.id_product,
          amount: Number(sale.amount),
          numberProducts: sale.number_products,
          idInformationPeriod: sale.id_information_period,
          nameProduct: sale.name,
          priceProduct: sale.price,
          firstNameCustomer: sale.first_name,
          lastNameCustomer: sale.last_name,
          createdAt: this.formatTimestamp(sale.created_at),
        };
      }),
    };
  }

  formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convertir formato 24h a 12h
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${year}-${month}-${day} ${formattedTime}`;
  };
}
