import { CreateProductDto } from '../../application/dtos/input/create-product.dto';
import { DeleteProductDto } from '../../application/dtos/input/delete-product.dto';
import { ListProductDto } from '../../application/dtos/input/list-product.dto';
import { UpdateProductDto } from '../../application/dtos/input/update-product.dto';
import { ProductResponseDto } from '../../application/dtos/output/product.response';

export interface IProductService {
  createProduct(data: CreateProductDto): Promise<ProductResponseDto>;
  updateProduct(data: UpdateProductDto): Promise<ProductResponseDto>;
  deleteProduct(data: DeleteProductDto): Promise<ProductResponseDto>;
  listProduct(query: ListProductDto): Promise<ProductResponseDto>;
}
