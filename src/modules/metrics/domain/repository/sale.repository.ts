import { PeriodDto } from '../../application/dtos/input/period';
import { TreandDto } from '../../application/dtos/input/trend.dto';

export interface ISaleRepository {
  getPeriodTrend(data: TreandDto): Promise<any>;
  getProductSales(data: PeriodDto): Promise<any>;
  getProductTrend(idProdcut: string, data: TreandDto): Promise<any>;
  getCustomerSales(data: PeriodDto): Promise<any>;
  getCustomerTrend(idCustomer: string, data: TreandDto): Promise<any>;
  getTotalProductSales(): Promise<any>;
  getBestSelligProductPeriod(data: PeriodDto): Promise<any>;
  getAmountSalePeriod(data: PeriodDto): Promise<any>;
  getInfoPeriod(data: PeriodDto): Promise<any>;
}
