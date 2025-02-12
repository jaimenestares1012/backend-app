import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AxiosModule } from '@src/libs/axios/axios.module';
import { CustomerController } from './presentation/controllers/customer.controller';
import {
  CUSTOMER_SERVICE,
  TB_CUSTOMER_REPOSITORY,
  TB_PERSON_REPOSITORY,
} from './providers.token';
import { CustomerService } from './application/services/customer.service';
import { CustomerAdapter } from './infrastructure/adapters/customer.adapter';
import { TbCustomerEntity } from './domain/entities/public/customer.entity';
import { TbPersonEntity } from './domain/entities/public/person.entity';
import { PersonAdapter } from './infrastructure/adapters/person.adapter';

@Module({
  controllers: [CustomerController],
  providers: [
    /* Messaging */
    /* Services */
    {
      provide: CUSTOMER_SERVICE,
      useClass: CustomerService,
    },

    /* Ports and Adapters */
    {
      provide: TB_CUSTOMER_REPOSITORY,
      useClass: CustomerAdapter,
    },

    {
      provide: TB_PERSON_REPOSITORY,
      useClass: PersonAdapter,
    },
  ],
  imports: [
    AxiosModule,
    TypeOrmModule.forFeature([TbCustomerEntity, TbPersonEntity]),
  ],
  exports: [CUSTOMER_SERVICE, TB_CUSTOMER_REPOSITORY, TB_PERSON_REPOSITORY],
})
export class CustomerModule {}
