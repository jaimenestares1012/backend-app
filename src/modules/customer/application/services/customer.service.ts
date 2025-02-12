import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ICustomerService } from '../../domain/interfaces/customer-service.interface';
import { ICustomerRepository } from '../../domain/repository/customer.repository';
import {
  TB_CUSTOMER_REPOSITORY,
  TB_PERSON_REPOSITORY,
} from '../../providers.token';
import { CreateCustomerPersonDto } from '../dtos/input/create-customer-person.dto';
import { CustomerResponseDto } from '../dtos/output/customer.response';
import { RESPONSE_CODE } from '@src/modules/shared/interface/enum';
import { v4 as uuidv4 } from 'uuid';
import { ListPersonDto } from '../dtos/input/list-customer.dto';
import { IPersonRepository } from '../../domain/repository/person.repository';
import { UpdateCustomerPersonDto } from '../dtos/input/update-customer-person.dto';
import { CustomBadRequestException } from '@src/modules/shared/exceptions/Exception';

@Injectable()
export class CustomerService implements ICustomerService {
  constructor() {}
  @Inject(TB_CUSTOMER_REPOSITORY)
  private customerRepository: ICustomerRepository;
  @Inject(TB_PERSON_REPOSITORY)
  private personRepository: IPersonRepository;

  async createCustomer(
    data: CreateCustomerPersonDto,
  ): Promise<CustomerResponseDto> {
    try {
      const dataPerson = await this.personRepository.validateExistPerson(
        data.document,
      );
      if (dataPerson) {
        throw new BadRequestException('Document already exists');
      }
      const id = uuidv4();
      const newPerson = {
        ...data,
        id: id,
      };
      await this.personRepository.createPerson(newPerson);
      const newCustomer = {
        id: id,
        isActive: true,
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      await this.customerRepository.createCustomer(newCustomer);
      return {
        responseCode: RESPONSE_CODE.SUCCESS,
        message: 'Ok',
        data: '',
      };
    } catch (error) {
      if (error instanceof CustomBadRequestException) {
        throw error;
      }
      throw new CustomBadRequestException(RESPONSE_CODE.ERROR, error.message);
    }
  }

  async updateCustomer(
    data: UpdateCustomerPersonDto,
  ): Promise<CustomerResponseDto> {
    const updateProduct = {
      id: data.id,
      updatedAt: new Date(),
    };
    await this.personRepository.updatePerson(data);
    await this.customerRepository.updateCustomer(updateProduct);
    return {
      responseCode: RESPONSE_CODE.SUCCESS,
      message: 'Ok',
      data: '',
    };
  }

  async deleteCustomer(idCustomer: string): Promise<CustomerResponseDto> {
    const updateCustomer = {
      isActive: false,
      id: idCustomer,
      updatedAt: new Date(),
    };
    console.log('updateCustomer', updateCustomer);

    const product =
      await this.customerRepository.updateCustomer(updateCustomer);
    console.log('product', product);

    return {
      responseCode: RESPONSE_CODE.SUCCESS,
      message: 'Ok',
      data: product,
    };
  }

  async listCustomer(query: ListPersonDto): Promise<CustomerResponseDto> {
    const person = await this.personRepository.listPersonAndCustomer(query);
    console.log('person', person);

    return {
      responseCode: RESPONSE_CODE.SUCCESS,
      message: 'Ok',
      data: person.map((prod) => {
        return {
          id: prod.id,
          firstName: prod.first_name,
          lastName: prod.last_name,
          document: prod.document,
          idComuna: prod.id_comuna,
          valueComuna: prod.value_comuna,
          idCity: prod.id_city,
          valueCity: prod.value_city,
          email: prod.email,
          phone: prod.phone,
        };
      }),
    };
  }
}
