import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TbPersonEntity } from '../../domain/entities/public/person.entity';
import { CreatePersonDto } from '../../application/dtos/input/create-person.dto';
import { ListPersonDto } from '../../application/dtos/input/list-customer.dto';
import appQuery from '../querys/querys';
import { IPersonRepository } from '../../domain/repository/person.repository';
import { UpdatePersonDto } from '../../application/dtos/input/update-person.dto';

@Injectable()
export class PersonAdapter implements IPersonRepository {
  constructor() {}
  @InjectRepository(TbPersonEntity)
  private companyRepository: Repository<TbPersonEntity>;

  async validateExistPerson(document: string): Promise<any> {
    const query = appQuery.VALIDATE_PERSON;
    const values = [document, true];
    const response = await this.companyRepository.query(query, values);
    return response[0];
  }
  async createPerson(data: CreatePersonDto): Promise<any> {
    await this.companyRepository.save(this.companyRepository.create(data));
  }
  async updatePerson(data: UpdatePersonDto): Promise<any> {
    console.log('data', data);
    await this.companyRepository.update(data.id, data);
  }

  async listPersonAndCustomer(data: ListPersonDto): Promise<any> {
    let query = appQuery.LIST_PERSON;
    let param1 = null;
    let param2 = null;
    if (data.search) {
      const search = data.search.trim().toLowerCase().split(' ');
      param1 = search[0] || null;
      param2 = search[1] || null;
    }
    const conditions: string[] = [];
    conditions.push(` tbc.is_active = true`);
    if (param1)
      conditions.push(
        `(
        unaccent(LOWER(tbp.first_name)) LIKE unaccent('%${param1.toLowerCase()}%') OR 
        unaccent(LOWER(tbp.last_name)) LIKE unaccent('%${param1.toLowerCase()}%') OR 
        unaccent(LOWER(tbp.document)) LIKE unaccent('%${param1.toLowerCase()}%')
        )`,
      );
    if (param2)
      conditions.push(
        `(
        unaccent(LOWER(tbp.last_name)) LIKE unaccent('%${param2.toLowerCase()}%') OR 
        unaccent(LOWER(tbp.last_name)) LIKE unaccent('%${param2.toLowerCase()}%') OR 
        unaccent(LOWER(tbp.document)) LIKE unaccent('%${param2.toLowerCase()}%')
        )`,
      );
    if (data.idCity) {
      conditions.push(` tbp.id_city = '${data.idCity}'`);
    }
    if (data.idComuna) {
      conditions.push(` tbp.id_comuna = '${data.idComuna}'`);
    }
    if (data.idCustomer) {
      conditions.push(` tbp.id = '${data.idCustomer}'`);
    }
    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ');
    }

    query += ` ORDER BY  tbc.created_at DESC`;
    console.log('query', query);

    const response = await this.companyRepository.query(query);
    return response;
  }
}
