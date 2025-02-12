import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tb_sale', { schema: 'public', synchronize: false })
export class TbSaleEntity extends BaseEntity {
  @ApiProperty({ example: 'uuid', description: 'Sale ID' })
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    length: 36,
    comment: 'Sale ID',
  })
  id: string;

  @ApiProperty({ example: 'uuid', description: 'Customer ID' })
  @Column({
    name: 'id_customer',
    type: 'varchar',
    length: 36,
    comment: 'Customer ID',
  })
  idCustomer: string;

  @ApiProperty({ example: 'uuid', description: 'Product ID' })
  @Column({
    name: 'id_product',
    type: 'varchar',
    length: 36,
    comment: 'Product ID',
  })
  idProduct: string;

  @ApiProperty({ example: 100.5, description: 'Total Amount' })
  @Column({
    name: 'amount',
    type: 'numeric',
    precision: 10,
    scale: 2,
    comment: 'Total Amount',
  })
  amount: number;

  @ApiProperty({ example: 2, description: 'Number of Products' })
  @Column({
    name: 'number_products',
    type: 'int',
    comment: 'Number of Products',
  })
  numberProducts: number;

  @ApiProperty({ example: 2, description: 'Activo o no' })
  @Column({
    name: 'is_active',
    type: 'boolean',
    comment: 'Boolean',
  })
  isActive: boolean;

  @ApiProperty({ example: '2024-01-01 12:00:00', description: 'Creation Date' })
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Creation Date',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-01 12:00:00',
    description: 'Last Update Date',
  })
  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: 'Last Update Date',
  })
  updatedAt: Date;

  @ApiProperty({ example: 'uuid', description: 'Information Period ID' })
  @Column({
    name: 'id_information_period',
    type: 'varchar',
    length: 36,
    comment: 'Information Period ID',
  })
  idInformationPeriod: string;
}
