import { ProductResponseDto } from '@src/modules/product/application/dtos/output/product.response';
import { CreateCustomerPersonDto } from '../../application/dtos/input/create-customer-person.dto';
import { ListPersonDto } from '../../application/dtos/input/list-customer.dto';
import { UpdateCustomerPersonDto } from '../../application/dtos/input/update-customer-person.dto';

export interface ICustomerService {
  createCustomer(data: CreateCustomerPersonDto): Promise<ProductResponseDto>;
  updateCustomer(data: UpdateCustomerPersonDto): Promise<ProductResponseDto>;
  deleteCustomer(idCustomer: string): Promise<ProductResponseDto>;
  listCustomer(query: ListPersonDto): Promise<ProductResponseDto>;
}
