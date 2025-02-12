import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tb_person', { schema: 'public', synchronize: false })
export class TbPersonEntity extends BaseEntity {
  @ApiProperty({ example: 'uuid', description: 'Customer ID' })
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    length: 36,
    comment: 'Customer ID',
  })
  id: string;

  @ApiProperty({ example: 'John', description: 'First Name' })
  @Column({
    name: 'first_name',
    type: 'varchar',
    comment: 'First Name',
  })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last Name' })
  @Column({
    name: 'last_name',
    type: 'varchar',
    comment: 'Last Name',
  })
  lastName: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'Email' })
  @Column({
    name: 'email',
    type: 'varchar',
    comment: 'Email',
  })
  email: string;

  @ApiProperty({ example: '+51 9351234567', description: 'Phone Number' })
  @Column({
    name: 'phone',
    type: 'varchar',
    comment: 'Phone Number',
  })
  phone: string;

  @ApiProperty({ example: '70066431', description: 'Document ID' })
  @Column({
    name: 'document',
    type: 'varchar',
    length: 12,
    comment: 'Document ID',
  })
  document: string;

  @ApiProperty({
    example: '9033355f-71af-4f1b-905b-63a09d3af418',
    description: 'City ID',
  })
  @Column({
    name: 'id_city',
    type: 'varchar',
    length: 36,
    comment: 'City ID',
  })
  idCity: string;

  @ApiProperty({
    example: '16cb2a20-01e0-4a1d-bdab-884bf8108695',
    description: 'Comuna ID',
  })
  @Column({
    name: 'id_comuna',
    type: 'varchar',
    length: 36,
    comment: 'Comuna ID',
  })
  idComuna: string;
}
