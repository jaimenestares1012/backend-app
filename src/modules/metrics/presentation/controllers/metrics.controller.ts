import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { METRICS_SERVICE } from '../../providers.token';
import { ProductResponseDto } from '../../application/dtos/output/product.response';
import { IMetricsService } from '../../domain/interfaces/metrics-service.interface';
import { TreandDto } from '../../application/dtos/input/trend.dto';
import { PeriodDto } from '../../application/dtos/input/period';

@ApiTags('Metrics')
@Controller({ path: 'metric', version: '1' })
export class MetricsController {
  constructor(
    @Inject(METRICS_SERVICE)
    private readonly metricsService: IMetricsService,
  ) {}

  @Get('trend')
  @ApiOperation({ summary: 'Tendencia de demanda vs meta por periodos' })
  @ApiOkResponse({
    description: 'Response tendencias',
    type: ProductResponseDto,
  })
  async getPeriodTrend(@Query() query: TreandDto): Promise<ProductResponseDto> {
    return this.metricsService.getPeriodTrend(query);
  }

  @Get('products/sales')
  @ApiOperation({ summary: 'Ventas totales por producto en un periodo' })
  @ApiOkResponse({
    description: 'Response de ventas totales por producto en un periodo',
    type: ProductResponseDto,
  })
  async getProductSales(
    @Query() query: PeriodDto,
  ): Promise<ProductResponseDto> {
    return this.metricsService.getProductSales(query);
  }

  @Get('products/trend/:idProduct')
  @ApiOperation({ summary: 'Evolución de ventas para un producto' })
  @ApiOkResponse({
    description: 'Response de crear nuevos productos',
    type: ProductResponseDto,
  })
  async getProductTrend(
    @Param('idProduct') idProduct: string,
    @Query() query: TreandDto,
  ): Promise<ProductResponseDto> {
    return this.metricsService.getProductTrend(idProduct, query);
  }

  @Get('customers/sales')
  @ApiOperation({ summary: 'Ventas totales por cliente en un periodo' })
  @ApiOkResponse({
    description: 'Response de crear nuevos productos',
    type: ProductResponseDto,
  })
  async getCustomerSales(
    @Query() query: PeriodDto,
  ): Promise<ProductResponseDto> {
    return this.metricsService.getCustomerSales(query);
  }

  @Get('customers/trend/:idCustomer')
  @ApiOperation({ summary: 'Evolución de ventas para un cliente' })
  @ApiOkResponse({
    description: 'Response de crear nuevos productos',
    type: ProductResponseDto,
  })
  async getCustomerTrend(
    @Param('idCustomer') idCustomer: string,
    @Query() query: TreandDto,
  ): Promise<ProductResponseDto> {
    return this.metricsService.getCustomerTrend(idCustomer, query);
  }

  @Get('products/sales-all')
  @ApiOperation({ summary: 'Distribución de ventas totales por producto' })
  @ApiOkResponse({
    description: 'Response de crear nuevos productos',
    type: ProductResponseDto,
  })
  async getTotalProductSales(): Promise<ProductResponseDto> {
    return this.metricsService.getTotalProductSales();
  }

  @Get('summary')
  @ApiOperation({ summary: 'Resumen clave de métricas para un periodo' })
  @ApiOkResponse({
    description: 'Response de crear nuevos productos',
    type: ProductResponseDto,
  })
  async getMetricsSummary(
    @Query() query: PeriodDto,
  ): Promise<ProductResponseDto> {
    return this.metricsService.getMetricsSummary(query);
  }
}
