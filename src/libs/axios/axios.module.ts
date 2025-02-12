import { Module } from '@nestjs/common';
import { AxiosService } from './axios.service'; // Importa el servicio AxiosService
import { AXIOS_SERVICE_TOKEN } from './axios-service.interface';

@Module({
  providers: [
    {
      provide: AXIOS_SERVICE_TOKEN,
      useClass: AxiosService,
    },
  ],
  exports: [AXIOS_SERVICE_TOKEN],
})
export class AxiosModule {}
