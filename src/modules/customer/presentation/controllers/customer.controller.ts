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
import { CUSTOMER_SERVICE } from '../../providers.token';
import { CreateCustomerPersonDto } from '../../application/dtos/input/create-customer-person.dto';
import { CustomerResponseDto } from '../../application/dtos/output/customer.response';
import { ICustomerService } from '../../domain/interfaces/customer-service.interface';
import { UpdateCustomerPersonDto } from '../../application/dtos/input/update-customer-person.dto';
import { ListPersonDto } from '../../application/dtos/input/list-customer.dto';

@ApiTags('Customer')
@Controller({ path: 'customer', version: '1' })
export class CustomerController {
  constructor(
    @Inject(CUSTOMER_SERVICE)
    private readonly customerService: ICustomerService,
  ) {}

  @Post('create')
  @ApiOperation({
    summary: 'API para crear nuevos clientes',
  })
  @ApiOkResponse({
    description: 'Response de crear nuevos clientes',
    type: CustomerResponseDto,
  })
  async createCustomer(
    @Body() body: CreateCustomerPersonDto,
  ): Promise<CustomerResponseDto> {
    return this.customerService.createCustomer(body);
  }

  @Patch('update')
  @ApiOperation({
    summary: 'API para actualizar clientes',
  })
  @ApiOkResponse({
    description: 'Response de actualizar clientes',
    type: CustomerResponseDto,
  })
  async updateCustomer(
    @Body() body: UpdateCustomerPersonDto,
  ): Promise<CustomerResponseDto> {
    return this.customerService.updateCustomer(body);
  }

  @Delete('delete/:idCustomer')
  @ApiOperation({
    summary: 'API para eliminar clientes',
  })
  @ApiOkResponse({
    description: 'Response de eliminar clientes',
    type: CustomerResponseDto,
  })
  async deleteCustomer(
    @Param('idCustomer') idCustomer: string,
  ): Promise<CustomerResponseDto> {
    return this.customerService.deleteCustomer(idCustomer);
  }

  @Get('list')
  @ApiOperation({
    summary: 'API para listas los clientes',
  })
  @ApiOkResponse({
    description: 'Response de listar clientes',
    type: CustomerResponseDto,
  })
  async getCustomer(
    @Query() query: ListPersonDto,
  ): Promise<CustomerResponseDto> {
    return this.customerService.listCustomer(query);
  }
}
