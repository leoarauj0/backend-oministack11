import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@compartilhado/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Usuario from '../infra/typeorm/entities/usuario';

import IUsuariosRepo from '../repositories/IUsuariosRepo';

interface IRequest {
  usuario_id: string;
  nomeDoAvatar: string;
}

@injectable()
class AddAvatarAoUsuario {
  constructor(@inject('UsuariosRepo') private usuariosRepo: IUsuariosRepo) {}

  public async execute({
    usuario_id,
    nomeDoAvatar,
  }: IRequest): Promise<Usuario> {
    const usuario = await this.usuariosRepo.encontrarPorId(usuario_id);

    if (!usuario) {
      throw new AppError(
        'Somente usuários autenticados podem mudar o avatar.',
        401,
      );
    }

    if (usuario.avatar) {
      // Deletar avatar anterior
      const caminhoAvatarUsuario = path.join(
        uploadConfig.diretorio,
        usuario.avatar,
      );
      // a função stat tras o status de um arquivo se ele existir
      const avatarUsuarioExiste = await fs.promises.stat(caminhoAvatarUsuario);

      if (avatarUsuarioExiste) {
        await fs.promises.unlink(caminhoAvatarUsuario);
      }
    }

    // pegando a informação que ja temos em usuario para salvar o avatar
    usuario.avatar = nomeDoAvatar;

    await this.usuariosRepo.save(usuario);

    return usuario;
  }
}

export default AddAvatarAoUsuario;
