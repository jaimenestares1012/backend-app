import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AxiosModule } from '@src/libs/axios/axios.module';
import { CatalogueController } from './presentation/controllers/catalogue.controller';
import {
  CATALOGUE_SERVICE,
  TB_PERIOD_REPOSITORY,
  TC_CITY_REPOSITORY,
  TC_COMUNA_REPOSITORY,
  TC_UNITS_REPOSITORY,
} from './providers.token';
import { CatalogueService } from './application/services/customer.service';
import { CityAdapter } from './infrastructure/adapters/city.adapter';
import { ComunaAdapter } from './infrastructure/adapters/comuna.adapter';
import { TcCityEntity } from './domain/entities/public/city.entity';
import { TcComunaEntity } from './domain/entities/public/comuna.entity';
import { UnitsAdapter } from './infrastructure/adapters/units.adapter';
import { TcUnitsMeasurementEntity } from './domain/entities/public/unit.entity';
import { PeriodAdapter } from './infrastructure/adapters/period.adapter';
import { TbPeriodEntity } from './domain/entities/public/period.entity';

@Module({
  controllers: [CatalogueController],
  providers: [
    /* Messaging */
    /* Services */
    {
      provide: CATALOGUE_SERVICE,
      useClass: CatalogueService,
    },

    /* Ports and Adapters */
    {
      provide: TC_CITY_REPOSITORY,
      useClass: CityAdapter,
    },

    {
      provide: TC_COMUNA_REPOSITORY,
      useClass: ComunaAdapter,
    },

    {
      provide: TC_UNITS_REPOSITORY,
      useClass: UnitsAdapter,
    },

    {
      provide: TB_PERIOD_REPOSITORY,
      useClass: PeriodAdapter,
    },
  ],
  imports: [
    AxiosModule,
    TypeOrmModule.forFeature([
      TcCityEntity,
      TcComunaEntity,
      TcUnitsMeasurementEntity,
      TbPeriodEntity,
    ]),
  ],
  exports: [],
})
export class CatalogueModule {}
