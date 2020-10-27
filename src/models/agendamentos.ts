import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('agendamentos')
class Agendamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provedor: string;

  @Column('timestamp with time zone')
  data: Date;

  // constructor({ provedor, data }: Omit<Agendamento, 'id'>) {
  //   this.id = uuid();
  //   this.provedor = provedor;
  //   this.data = data;
  // }
}

export default Agendamento;
