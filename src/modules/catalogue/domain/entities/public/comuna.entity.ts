import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tc_comuna', { schema: 'public', synchronize: false })
export class TcComunaEntity extends BaseEntity {
  @ApiProperty({ example: 'uuid', description: '' })
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    length: 36,
    comment: 'Customer ID',
  })
  id: string;

  @ApiProperty({ example: 'Lincoln', description: '' })
  @Column({
    name: 'value',
    type: 'varchar',
    comment: '',
  })
  value: string;
}
