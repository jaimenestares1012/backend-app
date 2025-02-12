import { CreatePersonDto } from '../../application/dtos/input/create-person.dto';
import { ListPersonDto } from '../../application/dtos/input/list-customer.dto';
import { UpdatePersonDto } from '../../application/dtos/input/update-person.dto';

export interface IPersonRepository {
  validateExistPerson(param: string): Promise<any>;
  createPerson(data: CreatePersonDto): Promise<any>;
  updatePerson(data: UpdatePersonDto): Promise<any>;
  listPersonAndCustomer(query: ListPersonDto): Promise<any>;
}
