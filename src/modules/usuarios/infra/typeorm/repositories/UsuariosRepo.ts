import { getRepository, Repository } from 'typeorm';

import IUsuariosRepo from '@modules/usuarios/repositories/IUsuariosRepo';

import ICriarUsuarioDTO from '@modules/usuarios/dtos/ICriarUsuarioDTO';
import Usuario from '../entities/usuario';

// // DTO: Data Transfer Object
// interface CriarAgendamentoDTO {
//   provedor: string;
//   data: Date;
// }

class UsuariosRepo implements IUsuariosRepo {
  private ormRepo: Repository<Usuario>;

  constructor() {
    this.ormRepo = getRepository(Usuario);
  }

  public async encontrarPorId(id: string): Promise<Usuario | undefined> {
    const usuario = await this.ormRepo.findOne(id);

    return usuario;
  }

  public async encontrarPorEmail(email: string): Promise<Usuario | undefined> {
    const usuario = await this.ormRepo.findOne({ where: { email } });

    return usuario;
  }

  // usuarioData = Dados: nome, email, senha
  public async create(usuarioData: ICriarUsuarioDTO): Promise<Usuario> {
    const agendamento = this.ormRepo.create(usuarioData);

    await this.ormRepo.save(agendamento);

    return agendamento;
  }

  public async save(usuario: Usuario): Promise<Usuario> {
    return this.ormRepo.save(usuario);
  }
}
export default UsuariosRepo;
