import { startOfHour } from 'date-fns';

import AppError from '@compartilhado/errors/AppError';

import Agendamento from '@modules/agendamentos/infra/typeorm/entities/agendamentos';
import { injectable, inject } from 'tsyringe';

import IAgendamentosRepo from '../repositories/IAgendamentosRepo';

interface IRequestDTO {
  provedor_id: string;
  data: Date;
}

// usando injeção de dependencias pegando o container da pasta compartilhado.
@injectable()
class CriarAgendamentoServico {
  constructor(
    @inject('AgendamentosRepo')
    private agendamentosRepo: IAgendamentosRepo,
  ) {}

  public async execute({
    data,
    provedor_id,
  }: IRequestDTO): Promise<Agendamento> {
    const dataAgendamento = startOfHour(data);

    const dataEmUso = await this.agendamentosRepo.encontrarPorData(
      dataAgendamento,
    );

    if (dataEmUso) {
      throw new AppError('Este horário já está agendado');
    }

    const agendamento = await this.agendamentosRepo.create({
      provedor_id,
      data: dataAgendamento,
    });

    return agendamento;
  }
}
export default CriarAgendamentoServico;
