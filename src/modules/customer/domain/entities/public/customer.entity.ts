import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tb_customer', { schema: 'public', synchronize: false })
export class TbCustomerEntity extends BaseEntity {
  @ApiProperty({ example: 'uuid', description: 'Customer ID' })
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    length: 36,
    comment: 'Customer ID',
  })
  id: string;

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
}
