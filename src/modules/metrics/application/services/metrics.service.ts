import { Inject, Injectable } from '@nestjs/common';
import { IMetricsService } from '../../domain/interfaces/metrics-service.interface';
import { TB_SALE_REPOSITORY } from '../../providers.token';
import { ProductResponseDto } from '../dtos/output/product.response';
import { RESPONSE_CODE } from '@src/modules/shared/interface/enum';
import { ISaleRepository } from '../../domain/repository/sale.repository';
import { CustomBadRequestException } from '@src/modules/shared/exceptions/Exception';
import { TreandDto } from '../dtos/input/trend.dto';
import { PeriodDto } from '../dtos/input/period';

@Injectable()
export class MetricService implements IMetricsService {
  constructor() {}
  @Inject(TB_SALE_REPOSITORY)
  private saleRepository: ISaleRepository;

  async getPeriodTrend(data: TreandDto): Promise<ProductResponseDto> {
    try {
      const response = await this.saleRepository.getPeriodTrend(data);
      return {
        responseCode: RESPONSE_CODE.SUCCESS,
        message: 'Ok',
        data: response.map((prod) => {
          return {
            period: prod.month,
            meta: prod.meta,
            allSales: Number(prod.suma),
          };
        }),
      };
    } catch (error) {
      if (error instanceof CustomBadRequestException) {
        throw error;
      }
      throw new CustomBadRequestException(RESPONSE_CODE.ERROR, error.message);
    }
  }

  async getProductSales(data: PeriodDto): Promise<ProductResponseDto> {
    try {
      const response = await this.saleRepository.getProductSales(data);
      return {
        responseCode: RESPONSE_CODE.SUCCESS,
        message: 'Ok',
        data: response.map((prod) => {
          return {
            idProduct: prod.id_product,
            nameProduct: prod.name_product,
            allSales: Number(prod.suma),
          };
        }),
      };
    } catch (error) {
      if (error instanceof CustomBadRequestException) {
        throw error;
      }
      throw new CustomBadRequestException(RESPONSE_CODE.ERROR, error.message);
    }
  }

  async getProductTrend(
    idProduct: string,
    data: TreandDto,
  ): Promise<ProductResponseDto> {
    try {
      const response = await this.saleRepository.getProductTrend(
        idProduct,
        data,
      );
      return {
        responseCode: RESPONSE_CODE.SUCCESS,
        message: 'Ok',
        data: response.map((prod) => {
          return {
            period: prod.month,
            allSales: Number(prod.suma),
          };
        }),
      };
    } catch (error) {
      if (error instanceof CustomBadRequestException) {
        throw error;
      }
      throw new CustomBadRequestException(RESPONSE_CODE.ERROR, error.message);
    }
  }

  async getCustomerSales(data: PeriodDto): Promise<ProductResponseDto> {
    try {
      const response = await this.saleRepository.getCustomerSales(data);
      return {
        responseCode: RESPONSE_CODE.SUCCESS,
        message: 'Ok',
        data: response.map((prod) => {
          return {
            idCustomer: prod.id_customer,
            nameCustomer: prod.name_customer,
            allSales: Number(prod.suma),
          };
        }),
      };
    } catch (error) {
      console.log('error', error);

      if (error instanceof CustomBadRequestException) {
        throw error;
      }
      throw new CustomBadRequestException(RESPONSE_CODE.ERROR, error.message);
    }
  }

  async getCustomerTrend(
    idCustomer: string,
    data: TreandDto,
  ): Promise<ProductResponseDto> {
    try {
      const response = await this.saleRepository.getCustomerTrend(
        idCustomer,
        data,
      );
      return {
        responseCode: RESPONSE_CODE.SUCCESS,
        message: 'Ok',
        data: response.map((prod) => {
          return {
            period: prod.month,
            allSales: Number(prod.suma),
          };
        }),
      };
    } catch (error) {
      if (error instanceof CustomBadRequestException) {
        throw error;
      }
      throw new CustomBadRequestException(RESPONSE_CODE.ERROR, error.message);
    }
  }

  async getTotalProductSales(): Promise<ProductResponseDto> {
    try {
      const response = await this.saleRepository.getTotalProductSales();
      return {
        responseCode: RESPONSE_CODE.SUCCESS,
        message: 'Ok',
        data: response.map((prod) => {
          return {
            idProduct: prod.id_product,
            nameProduct: prod.name_product,
            allSales: Number(prod.suma),
          };
        }),
      };
    } catch (error) {
      if (error instanceof CustomBadRequestException) {
        throw error;
      }
      throw new CustomBadRequestException(RESPONSE_CODE.ERROR, error.message);
    }
  }
  async getMetricsSummary(data: PeriodDto): Promise<ProductResponseDto> {
    try {
      const bestProduct =
        await this.saleRepository.getBestSelligProductPeriod(data);
      const amountSalePeriod =
        await this.saleRepository.getAmountSalePeriod(data);
      const infoPeriod = await this.saleRepository.getInfoPeriod(data);
      console.log(
        'Number(amountSalePeriod.amount_all)',
        Number(amountSalePeriod.amount_all),
      );
      console.log('amountSalePeriod', amountSalePeriod);

      return {
        responseCode: RESPONSE_CODE.SUCCESS,
        message: 'Ok',
        data: {
          bestProduct: {
            idProduct: bestProduct?.id_product ?? 'sin producto',
            nameProduct: bestProduct?.name_product ?? 'sin producto',
            allSalesProduct: bestProduct?.amount_all
              ? Number(bestProduct.number_products)
              : 0,
            allSalesAmount: bestProduct?.amount_all
              ? Number(bestProduct.amount_all)
              : 0,
          },
          amountSalePeriod: {
            amountSalePeriod: Number(amountSalePeriod?.amount_all) ?? 0,
          },
          salesAdvance: {
            salesAdvance: `${(Number(amountSalePeriod.amount_all) / infoPeriod.meta) * 100} %`,
          },
        },
      };
    } catch (error) {
      if (error instanceof CustomBadRequestException) {
        throw error;
      }
      throw new CustomBadRequestException(RESPONSE_CODE.ERROR, error.message);
    }
  }
}
