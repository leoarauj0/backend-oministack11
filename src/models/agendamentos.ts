import { uuid } from 'uuidv4';

class Agendamento {
  id: string;

  provedor: string;

  data: Date;

  constructor({ provedor, data }: Omit<Agendamento, 'id'>) {
    this.id = uuid();
    this.provedor = provedor;
    this.data = data;
  }
}

export default Agendamento;
