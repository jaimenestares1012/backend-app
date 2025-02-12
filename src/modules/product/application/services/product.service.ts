import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IProductService } from '../../domain/interfaces/product-service.interface';
import { IProductRepository } from '../../domain/repository/product.repository';
import { TB_PRODUCT_REPOSITORY } from '../../providers.token';
import { CreateProductDto } from '../dtos/input/create-product.dto';
import { ProductResponseDto } from '../dtos/output/product.response';
import { RESPONSE_CODE } from '@src/modules/shared/interface/enum';
import { v4 as uuidv4 } from 'uuid';
import { UpdateProductDto } from '../dtos/input/update-product.dto';
import { DeleteProductDto } from '../dtos/input/delete-product.dto';
import { ListProductDto } from '../dtos/input/list-product.dto';
import { CustomBadRequestException } from '@src/modules/shared/exceptions/Exception';

@Injectable()
export class ProductService implements IProductService {
  constructor() {}
  @Inject(TB_PRODUCT_REPOSITORY)
  private productRepository: IProductRepository;
  async createProduct(data: CreateProductDto): Promise<ProductResponseDto> {
    try {
      const existingProduct = await this.productRepository.findByName(
        data.name,
      );
      if (existingProduct) {
        throw new BadRequestException('Product already exists');
      }
      const newProduct = {
        ...data,
        id: uuidv4(),
        isActive: true,
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      const product = await this.productRepository.createProduct(newProduct);
      return {
        responseCode: RESPONSE_CODE.SUCCESS,
        message: 'Ok',
        data: product,
      };
    } catch (error) {
      if (error instanceof CustomBadRequestException) {
        throw error;
      }
      throw new CustomBadRequestException(RESPONSE_CODE.ERROR, error.message);
    }
  }

  async updateProduct(data: UpdateProductDto): Promise<ProductResponseDto> {
    const updateProduct = {
      ...data,
      updatedAt: new Date(),
    };
    const product = await this.productRepository.updateProduct(updateProduct);
    return {
      responseCode: RESPONSE_CODE.SUCCESS,
      message: 'Ok',
      data: product,
    };
  }

  async deleteProduct(data: DeleteProductDto): Promise<ProductResponseDto> {
    const updateProduct = {
      isActive: false,
      id: data.id,
      updatedAt: new Date(),
    };
    const product = await this.productRepository.updateProduct(updateProduct);
    return {
      responseCode: RESPONSE_CODE.SUCCESS,
      message: 'Ok',
      data: product,
    };
  }

  async listProduct(query: ListProductDto): Promise<ProductResponseDto> {
    const products = await this.productRepository.listProduct(query);
    return {
      responseCode: RESPONSE_CODE.SUCCESS,
      message: 'Ok',
      data: products.map((prod) => {
        return {
          id: prod.id,
          name: prod.name,
          price: Number(prod.price),
          stock: prod.stock,
          idUnitsMeasurement: prod.id_units_measurement,
          valueUnitsMeasurement: prod.value_units_measurement,
        };
      }),
    };
  }
}
