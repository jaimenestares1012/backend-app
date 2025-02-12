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
import { PRODUCT_SERVICE } from '../../providers.token';
import { CreateProductDto } from '../../application/dtos/input/create-product.dto';
import { ProductResponseDto } from '../../application/dtos/output/product.response';
import { IProductService } from '../../domain/interfaces/product-service.interface';
import { UpdateProductDto } from '../../application/dtos/input/update-product.dto';
import { ListProductDto } from '../../application/dtos/input/list-product.dto';

@ApiTags('Productos')
@Controller({ path: 'product', version: '1' })
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productService: IProductService,
  ) {}

  @Post('create')
  @ApiOperation({
    summary: 'API para crear nuevos productos',
  })
  @ApiOkResponse({
    description: 'Response de crear nuevos productos',
    type: ProductResponseDto,
  })
  async createProduct(
    @Body() body: CreateProductDto,
  ): Promise<ProductResponseDto> {
    return this.productService.createProduct(body);
  }

  @Patch('update')
  @ApiOperation({
    summary: 'API para actualizar productos',
  })
  @ApiOkResponse({
    description: 'Response de actualizar productos',
    type: ProductResponseDto,
  })
  async updateProduct(
    @Body() body: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    return this.productService.updateProduct(body);
  }

  @Delete('delete/:idCustomer')
  @ApiOperation({
    summary: 'API para eliminar productos',
  })
  @ApiOkResponse({
    description: 'Response de eliminar productos',
    type: ProductResponseDto,
  })
  async deleteProduct(
    @Param('idCustomer') idCustomer: string,
  ): Promise<ProductResponseDto> {
    return this.productService.deleteProduct({ id: idCustomer });
  }

  @Get('list')
  @ApiOperation({
    summary: 'API para listas los productos',
  })
  @ApiOkResponse({
    description: 'Response de listar productos',
    type: ProductResponseDto,
  })
  async getProduct(
    @Query() query: ListProductDto,
  ): Promise<ProductResponseDto> {
    return this.productService.listProduct(query);
  }
}
