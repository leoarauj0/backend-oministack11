import Agendamento from '../infra/typeorm/entities/agendamentos';
import ICriarAgendamentoDTO from '../dtos/ICriarAgendamentoDTO';

// define quais metodos precisam existir no repositorio de agendamentos
export default interface IAgendamentosRepo {
  create(data: ICriarAgendamentoDTO): Promise<Agendamento>;
  encontrarPorData(date: Date): Promise<Agendamento | undefined>;
}
