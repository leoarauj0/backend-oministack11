import Usuario from '../infra/typeorm/entities/usuario';
import ICriarUsuarioDTO from '../dtos/ICriarUsuarioDTO';

export default interface IUsuariosRepo {
  encontrarPorId(id: string): Promise<Usuario | undefined>;
  encontrarPorEmail(email: string): Promise<Usuario | undefined>;
  create(data: ICriarUsuarioDTO): Promise<Usuario>;
  save(usuario: Usuario): Promise<Usuario>;
}
