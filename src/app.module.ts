/* NESTJS IMPORTS */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

/* LIBRARY IMPORTS */
import { EnvConfiguration } from '@src/libs/config/env.config';
/* MODULES IMPORTS */
import { configSchema } from '@src/libs/config/config.schema';
import { ProductModule } from './modules/product/product.module';
import { PostgreModule } from './libs/database/postgre.module';
import { CustomerModule } from './modules/customer/customer.module';
import { SaleModule } from './modules/sale/sale.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { CatalogueModule } from './modules/catalogue/catalogue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: configSchema,
      isGlobal: true,

      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
    }),

    PostgreModule,
    EventEmitterModule.forRoot(),
    /* Modules */
    ProductModule,
    CustomerModule,
    SaleModule,
    MetricsModule,
    CatalogueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
