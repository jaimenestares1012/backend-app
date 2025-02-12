import { CreateProductDto } from '../../application/dtos/input/create-product.dto';
import { ListProductDto } from '../../application/dtos/input/list-product.dto';
import { UpdateProductDto } from '../../application/dtos/input/update-product.dto';

export interface IProductRepository {
  findById(name: string): Promise<any>;
  findByName(name: string): Promise<any>;
  createProduct(data: CreateProductDto): Promise<any>;
  updateProduct(data: UpdateProductDto): Promise<any>;
  listProduct(query: ListProductDto): Promise<any>;
}
