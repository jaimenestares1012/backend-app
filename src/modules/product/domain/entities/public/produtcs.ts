import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tb_product', { schema: 'public', synchronize: false })
export class TbProductEntity extends BaseEntity {
  @ApiProperty({ example: 'uuid', description: 'Product ID' })
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    length: 36,
    comment: 'Product ID',
  })
  id: string;

  @ApiProperty({ example: 'Product Name', description: 'Product Name' })
  @Column({
    name: 'name',
    type: 'varchar',
    comment: 'Product Name',
  })
  name: string;

  @ApiProperty({ example: 99.99, description: 'Product Price' })
  @Column({
    name: 'price',
    type: 'numeric',
    precision: 10,
    scale: 2,
    comment: 'Product Price',
  })
  price: number;

  @ApiProperty({ example: 100, description: 'Stock Quantity' })
  @Column({
    name: 'stock',
    type: 'int',
    comment: 'Stock Quantity',
  })
  stock: number;

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

  @ApiProperty({ example: true, description: 'Is Active' })
  @Column({
    name: 'is_active',
    type: 'bool',
    default: true,
    comment: 'Is Active',
  })
  isActive: boolean;

  @ApiProperty({ example: 'uuid', description: 'Units Measurement ID' })
  @Column({
    name: 'id_units_measurement',
    type: 'varchar',
    length: 36,
    comment: 'Units Measurement ID',
  })
  idUnitsMeasurement: string;
}
