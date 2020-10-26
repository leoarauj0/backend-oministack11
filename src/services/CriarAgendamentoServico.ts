import { startOfHour } from 'date-fns';

import Agendamento from '../models/agendamentos';
import AgendamentosRepo from '../repositories/AgendamentosRepo';

interface RequestDTO {
  provedor: string;
  data: Date;
 }

class CriarAgendamentoServico {
  private agendamentosRepo: AgendamentosRepo;

  constructor(agendamentosRepo: AgendamentosRepo) {
    this.agendamentosRepo = agendamentosRepo;
  }

  public execute({ data, provedor }: RequestDTO): Agendamento {
    const dataAgendamento = startOfHour(data);

    const dataEmUso = this.agendamentosRepo.encontrarPorData(dataAgendamento);

    if (dataEmUso) {
      throw Error('Este horário já está agendado');
    }

    const agendamento = this.agendamentosRepo.create({ provedor, data: dataAgendamento });

    return agendamento;
  }
}
export default CriarAgendamentoServico;
