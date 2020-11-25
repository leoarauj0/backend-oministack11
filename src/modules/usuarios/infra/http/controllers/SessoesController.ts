import { Request, Response } from 'express';

import AutenticacaoDeUsuarioServico from '@modules/usuarios/services/AutenticacaoDeUsuarioServico';

import { container } from 'tsyringe';

export default class SessoesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, senha } = req.body;

    const autenticacaoDeUsuario = container.resolve(
      AutenticacaoDeUsuarioServico,
    );

    const { usuario, token } = await autenticacaoDeUsuario.execute({
      email,
      senha,
    });

    // delete usuario.senha;
    usuario.senha = 'bleee!';

    return res.json({ usuario, token });
  }
}
