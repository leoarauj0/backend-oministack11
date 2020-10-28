import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Agendamento from '../models/agendamentos';
import AgendamentosRepo from '../repositories/AgendamentosRepo';

interface RequestDTO {
  provedor: string;
  data: Date;
}

class CriarAgendamentoServico {
  public async execute({ data, provedor }: RequestDTO): Promise<Agendamento> {
    const agendamentosRepo = getCustomRepository(AgendamentosRepo);
    const dataAgendamento = startOfHour(data);

    const dataEmUso = await agendamentosRepo.encontrarPorData(dataAgendamento);

    if (dataEmUso) {
      throw Error('Este horário já está agendado');
    }

    const agendamento = agendamentosRepo.create({
      provedor,
      data: dataAgendamento,
    });

    await agendamentosRepo.save(agendamento);

    return agendamento;
  }
}
export default CriarAgendamentoServico;
