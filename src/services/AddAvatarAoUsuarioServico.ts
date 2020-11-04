import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Usuario from '../models/usuario';

import AppError from '../errors/AppError';

import uploadConfig from '../config/upload';

interface Request {
  usuario_id: string;
  nomeDoAvatar: string;
}

class AddAvatarAoUsuario {
  public async execute({
    usuario_id,
    nomeDoAvatar,
  }: Request): Promise<Usuario> {
    const usuariosRepo = getRepository(Usuario);

    const usuario = await usuariosRepo.findOne(usuario_id);

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

    await usuariosRepo.save(usuario);

    return usuario;
  }
}

export default AddAvatarAoUsuario;
