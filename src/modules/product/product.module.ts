import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AxiosModule } from '@src/libs/axios/axios.module';
import { ProductController } from './presentation/controllers/product.controller';
import { PRODUCT_SERVICE, TB_PRODUCT_REPOSITORY } from './providers.token';
import { TbProductEntity } from './domain/entities/public/produtcs';
import { ProductAdapter } from './infrastructure/adapters/product.adapter';
import { ProductService } from './application/services/product.service';

@Module({
  controllers: [ProductController],
  providers: [
    /* Messaging */
    /* Services */
    {
      provide: PRODUCT_SERVICE,
      useClass: ProductService,
    },

    /* Ports and Adapters */
    {
      provide: TB_PRODUCT_REPOSITORY,
      useClass: ProductAdapter,
    },
  ],
  imports: [AxiosModule, TypeOrmModule.forFeature([TbProductEntity])],
  exports: [PRODUCT_SERVICE, TB_PRODUCT_REPOSITORY],
})
export class ProductModule {}
