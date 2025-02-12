import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BDParameteres } from '../config/types.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<BDParameteres>('bd').host,
        port: config.get<BDParameteres>('bd').port,
        database: config.get<BDParameteres>('bd').database,
        username: config.get<BDParameteres>('bd').username,
        password: config.get<BDParameteres>('bd').password,
        autoLoadEntities: true,
        synchronize: false, // NO TOCAR !!!!! NO TOCAR !!!!! PELIGRO
        // ssl: {
        //   rejectUnauthorized: false,
        // },
        // logging: true,
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class PostgreModule {}
