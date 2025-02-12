import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tb_information_period', { schema: 'public', synchronize: false })
export class TbPeriodEntity extends BaseEntity {
  @ApiProperty({ example: 'uuid', description: 'ID' })
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    length: 36,
    comment: 'ID',
  })
  id: string;

  @ApiProperty({ example: '2024-02', description: 'Month' })
  @Column({
    name: 'month',
    type: 'varchar',
    comment: 'Month',
  })
  month: string;

  @ApiProperty({ example: 100, description: 'Demand' })
  @Column({
    name: 'demanda',
    type: 'int',
    comment: 'Demand',
  })
  demanda: number;

  @ApiProperty({ example: 200, description: 'Goal' })
  @Column({
    name: 'meta',
    type: 'int',
    comment: 'Goal',
  })
  meta: number;

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
}
