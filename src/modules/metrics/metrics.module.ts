import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AxiosModule } from '@src/libs/axios/axios.module';
import { MetricService } from './application/services/metrics.service';
import { MetricsController } from './presentation/controllers/metrics.controller';
import { METRICS_SERVICE, TB_SALE_REPOSITORY } from './providers.token';
import { TbSaleEntity } from './domain/entities/public/sale.entity';
import { SaleAdapter } from './infrastructure/adapters/sale.adapter';

@Module({
  controllers: [MetricsController],
  providers: [
    /* Messaging */
    /* Services */
    {
      provide: METRICS_SERVICE,
      useClass: MetricService,
    },

    /* Ports and Adapters */
    {
      provide: TB_SALE_REPOSITORY,
      useClass: SaleAdapter,
    },
  ],
  imports: [AxiosModule, TypeOrmModule.forFeature([TbSaleEntity])],
  exports: [],
})
export class MetricsModule {}
