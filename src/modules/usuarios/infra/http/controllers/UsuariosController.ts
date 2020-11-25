import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CriarUsuarioServico from '@modules/usuarios/services/CriarUsuarioServico';

interface Usuario {
  nome: string;
  email: string;
  senha?: string;
}

export default class UsuarioControler {
  public async create(req: Request, res: Response): Promise<Response> {
    const { nome, email, senha } = req.body;

    const CriarUsuario = container.resolve(CriarUsuarioServico);

    const usuario: Usuario = await CriarUsuario.execute({
      nome,
      email,
      senha,
    });

    delete usuario.senha;

    return res.json(usuario);
  }
}
