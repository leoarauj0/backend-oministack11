/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Usuario from '@modules/usuarios/infra/typeorm/entities/usuario';

@Entity('agendamentos')
class Agendamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provedor_id: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'provedor_id' })
  provedor: Usuario;

  @Column('timestamp with time zone')
  data: Date;

  @CreateDateColumn()
  criado_em: Date;

  @UpdateDateColumn()
  atualizado_em: Date;
}

export default Agendamento;
