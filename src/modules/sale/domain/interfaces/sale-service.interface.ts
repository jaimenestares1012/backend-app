import { CreateSaleDto } from '../../application/dtos/input/create-sale.dto';
import { DeletSaleDto } from '../../application/dtos/input/delete-sale.dto';
import { ListSaleDto } from '../../application/dtos/input/list-sale.dto';
import { UpdateSaleDto } from '../../application/dtos/input/update-sale.dto';
import { ProductResponseDto } from '../../application/dtos/output/product.response';

export interface ISaleService {
  createSale(data: CreateSaleDto): Promise<ProductResponseDto>;
  updateSale(data: UpdateSaleDto): Promise<ProductResponseDto>;
  deleteSale(id: DeletSaleDto): Promise<ProductResponseDto>;
  listSale(query: ListSaleDto): Promise<ProductResponseDto>;
}
