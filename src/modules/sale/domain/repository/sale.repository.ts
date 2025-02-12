import { CreateSaleDto } from '../../application/dtos/input/create-sale.dto';
import { ListSaleDto } from '../../application/dtos/input/list-sale.dto';
// import { UpdateSaleDto } from '../../application/dtos/input/update-sale.dto';

export interface ISaleRepository {
  findById(name: string): Promise<any>;
  createSale(data: CreateSaleDto): Promise<any>;
  updateSale(data: any): Promise<any>;
  listSale(query: ListSaleDto): Promise<any>;
}
