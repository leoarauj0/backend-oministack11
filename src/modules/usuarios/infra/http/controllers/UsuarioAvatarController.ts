import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AddAvatarAoUsuarioServico from '@modules/usuarios/services/AddAvatarAoUsuarioServico';

export default class UsuarioAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const addAvatarAoUsuario = container.resolve(AddAvatarAoUsuarioServico);

    const usuario = await addAvatarAoUsuario.execute({
      usuario_id: req.user.id,
      nomeDoAvatar: req.file.filename,
    });

    usuario.senha = 'bleee!';

    return res.json(usuario);
  }
}
