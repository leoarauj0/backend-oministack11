import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Agendamento from '../models/agendamentos';
import AgendamentosRepo from '../repositories/AgendamentosRepo';

interface RequestDTO {
  provedor_id: string;
  data: Date;
}

class CriarAgendamentoServico {
  public async execute({
    data,
    provedor_id,
  }: RequestDTO): Promise<Agendamento> {
    const agendamentosRepo = getCustomRepository(AgendamentosRepo);
    const dataAgendamento = startOfHour(data);

    const dataEmUso = await agendamentosRepo.encontrarPorData(dataAgendamento);

    if (dataEmUso) {
      throw new AppError('Este horário já está agendado');
    }

    const agendamento = agendamentosRepo.create({
      provedor_id,
      data: dataAgendamento,
    });

    await agendamentosRepo.save(agendamento);

    return agendamento;
  }
}
export default CriarAgendamentoServico;
