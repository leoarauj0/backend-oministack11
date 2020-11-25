import { container } from 'tsyringe';

import IAgendamentosRepo from '@modules/agendamentos/repositories/IAgendamentosRepo';
import AgendamentosRepo from '@modules/agendamentos/infra/typeorm/repositories/AgendamentosRepo';

import IUsuariosRepo from '@modules/usuarios/repositories/IUsuariosRepo';
import UsuariosRepo from '@modules/usuarios/infra/typeorm/repositories/UsuariosRepo';

// diferente do register esse Singleton vai instanciar a classe uma unica vez durante o ciclo de vida da aplicação
container.registerSingleton<IAgendamentosRepo>(
  'AgendamentosRepo',
  AgendamentosRepo,
);

container.registerSingleton<IUsuariosRepo>('UsuariosRepo', UsuariosRepo);
