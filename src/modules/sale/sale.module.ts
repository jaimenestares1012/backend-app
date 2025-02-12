import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AxiosModule } from '@src/libs/axios/axios.module';
import { SaleService } from './application/services/sale.service';
import { SaleController } from './presentation/controllers/sale.controller';
import {
  SALE_SERVICE,
  TB_INFORMARTION_PERIOD_REPOSITORY,
  TB_SALE_REPOSITORY,
} from './providers.token';
import { TbSaleEntity } from './domain/entities/public/sale.entity';
import { SaleAdapter } from './infrastructure/adapters/sale.adapter';
import { ProductModule } from '../product/product.module';
import { InformationPeriodAdapter } from './infrastructure/adapters/informationPeriod.adapter';
import { TbPeriodEntity } from './domain/entities/public/period.entity';
import { CustomerModule } from '../customer/customer.module';

@Module({
  controllers: [SaleController],
  providers: [
    /* Messaging */
    /* Services */
    {
      provide: SALE_SERVICE,
      useClass: SaleService,
    },

    /* Ports and Adapters */
    {
      provide: TB_SALE_REPOSITORY,
      useClass: SaleAdapter,
    },
    {
      provide: TB_INFORMARTION_PERIOD_REPOSITORY,
      useClass: InformationPeriodAdapter,
    },
  ],
  imports: [
    AxiosModule,
    TypeOrmModule.forFeature([TbSaleEntity, TbPeriodEntity]),
    ProductModule,
    CustomerModule,
  ],
  exports: [],
})
export class SaleModule {}
