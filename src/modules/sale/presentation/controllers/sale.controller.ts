import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SALE_SERVICE } from '../../providers.token';
import { CreateSaleDto } from '../../application/dtos/input/create-sale.dto';
import { ProductResponseDto } from '../../application/dtos/output/product.response';
import { ISaleService } from '../../domain/interfaces/sale-service.interface';
import { UpdateSaleDto } from '../../application/dtos/input/update-sale.dto';
import { ListSaleDto } from '../../application/dtos/input/list-sale.dto';

@ApiTags('Sale')
@Controller({ path: 'sale', version: '1' })
export class SaleController {
  constructor(
    @Inject(SALE_SERVICE)
    private readonly productService: ISaleService,
  ) {}

  @Post('create')
  @ApiOperation({
    summary: 'API para crear nuevos productos',
  })
  @ApiOkResponse({
    description: 'Response de crear nuevos productos',
    type: ProductResponseDto,
  })
  async createSale(@Body() body: CreateSaleDto): Promise<ProductResponseDto> {
    return this.productService.createSale(body);
  }

  @Patch('update')
  @ApiOperation({
    summary: 'API para actualizar productos',
  })
  @ApiOkResponse({
    description: 'Response de actualizar productos',
    type: ProductResponseDto,
  })
  async updateSale(@Body() body: UpdateSaleDto): Promise<ProductResponseDto> {
    return this.productService.updateSale(body);
  }

  @Delete('delete/:idSale')
  @ApiOperation({
    summary: 'API para eliminar productos',
  })
  @ApiOkResponse({
    description: 'Response de eliminar productos',
    type: ProductResponseDto,
  })
  async deleteSale(
    @Param('idSale') idSale: string,
  ): Promise<ProductResponseDto> {
    return this.productService.deleteSale({ id: idSale });
  }

  @Get('list')
  @ApiOperation({
    summary: 'API para listas los productos',
  })
  @ApiOkResponse({
    description: 'Response de listar productos',
    type: ProductResponseDto,
  })
  async getSale(@Query() query: ListSaleDto): Promise<ProductResponseDto> {
    return this.productService.listSale(query);
  }
}
