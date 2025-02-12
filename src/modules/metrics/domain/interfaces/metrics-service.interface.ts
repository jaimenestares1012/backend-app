import { PeriodDto } from '../../application/dtos/input/period';
import { TreandDto } from '../../application/dtos/input/trend.dto';
import { ProductResponseDto } from '../../application/dtos/output/product.response';

export interface IMetricsService {
  getPeriodTrend(data: TreandDto): Promise<ProductResponseDto>;
  getProductSales(data: PeriodDto): Promise<ProductResponseDto>;
  getProductTrend(
    idProduct: string,
    data: TreandDto,
  ): Promise<ProductResponseDto>;
  getCustomerSales(data: PeriodDto): Promise<any>;
  getCustomerTrend(idCustomer: string, data: TreandDto): Promise<any>;
  getTotalProductSales(): Promise<any>;
  getMetricsSummary(data: PeriodDto): Promise<any>;
}
