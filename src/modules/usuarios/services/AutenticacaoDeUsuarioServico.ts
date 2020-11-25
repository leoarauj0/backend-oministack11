import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import autenticacaoConfig from '@config/autenticacao';

import AppError from '@compartilhado/errors/AppError';

import { injectable, inject } from 'tsyringe';
import Usuario from '../infra/typeorm/entities/usuario';

import IUsuariosRepo from '../repositories/IUsuariosRepo';

interface IRequestDTO {
  email: string;
  senha: string;
}

interface IResponseDTO {
  usuario: Usuario;
  token: string;
}

@injectable()
class AutenticacaoDeUsuarioServico {
  constructor(
    @inject('UsuariosRepo')
    private usuariosRepo: IUsuariosRepo,
  ) {}

  public async execute({ email, senha }: IRequestDTO): Promise<IResponseDTO> {
    const usuario = await this.usuariosRepo.encontrarPorEmail(email);

    if (!usuario) {
      throw new AppError('Login incorreto.', 401);
    }

    const senhaCoincide = await compare(senha, usuario.senha);

    if (!senhaCoincide) {
      throw new AppError('Senha incorreta.', 401);
    }

    const { secret, expiresIn } = autenticacaoConfig.jwt;
    // 1° parametro vai informações que podem ser desincriptadas
    // 3° parametro configurações do token
    const token = sign({}, secret, {
      subject: usuario.id,
      expiresIn,
    });

    return {
      usuario,
      token,
    };
  }
}

export default AutenticacaoDeUsuarioServico;
