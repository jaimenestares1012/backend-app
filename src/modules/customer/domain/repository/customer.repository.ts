import { CreateCustomerDto } from '../../application/dtos/input/create-customer.dto';
import { UpdateCustomerDto } from '../../application/dtos/input/update-customer.dto';

export interface ICustomerRepository {
  createCustomer(data: CreateCustomerDto): Promise<any>;
  updateCustomer(data: UpdateCustomerDto): Promise<any>;
}
