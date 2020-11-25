import { getRepository, Repository } from 'typeorm';

import IAgendamentosRepo from '@modules/agendamentos/repositories/IAgendamentosRepo';

import ICriarAgendamentoDTO from '@modules/agendamentos/dtos/ICriarAgendamentoDTO';
import Agendamento from '../entities/agendamentos';

// // DTO: Data Transfer Object
// interface CriarAgendamentoDTO {
//   provedor: string;
//   data: Date;
// }

class AgendamentosRepo implements IAgendamentosRepo {
  private ormRepo: Repository<Agendamento>;

  constructor() {
    this.ormRepo = getRepository(Agendamento);
  }

  public async encontrarPorData(data: Date): Promise<Agendamento | undefined> {
    const encontrarAgendamento = await this.ormRepo.findOne({
      where: { data },
    });

    return encontrarAgendamento;
  }

  public async create({
    provedor_id,
    data,
  }: ICriarAgendamentoDTO): Promise<Agendamento> {
    const agendamento = this.ormRepo.create({ provedor_id, data });

    await this.ormRepo.save(agendamento);

    return agendamento;
  }
}
export default AgendamentosRepo;
