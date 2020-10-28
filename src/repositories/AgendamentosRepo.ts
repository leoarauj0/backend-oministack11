import { EntityRepository, Repository } from 'typeorm';

import Agendamento from '../models/agendamentos';

// // DTO: Data Transfer Object
// interface CriarAgendamentoDTO {
//   provedor: string;
//   data: Date;
// }

@EntityRepository(Agendamento)
class AgendamentosRepo extends Repository<Agendamento> {
  public async encontrarPorData(data: Date): Promise<Agendamento | null> {
    const encontrarAgendamento = await this.findOne({
      where: { data },
    });

    return encontrarAgendamento || null;
  }
}
export default AgendamentosRepo;
