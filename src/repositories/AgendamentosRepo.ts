import { isEqual } from 'date-fns';

import Agendamento from '../models/agendamentos';

// DTO: Data Transfer Object
interface CriarAgendamentoDTO {
  provedor: string;
  data: Date;
}

class AgendamentosRepo {
  private agendamentos: Agendamento[];

  constructor() {
    this.agendamentos = [];
  }

  public todosAgendamentos() {
    return this.agendamentos;
  }

  public encontrarPorData(data: Date): Agendamento | null {
    const encontrarAgendamento = this.agendamentos.find(
      (agendamento) => isEqual(data, agendamento.data),
    );

    return encontrarAgendamento || null;
  }

  public create({ provedor, data }: CriarAgendamentoDTO): Agendamento {
    const agendamento = new Agendamento({ provedor, data });

    this.agendamentos.push(agendamento);

    return agendamento;
  }
}
export default AgendamentosRepo;
