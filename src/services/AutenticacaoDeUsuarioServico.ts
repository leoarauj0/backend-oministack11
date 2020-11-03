import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import autenticacaoConfig from '../config/autenticacao';

import Usuario from '../models/usuario';

interface RequestDTO {
  email: string;
  senha: string;
}

interface ResponseDTO {
  usuario: Usuario;
  token: string;
}

class AutenticacaoDeUsuarioServico {
  public async execute({ email, senha }: RequestDTO): Promise<ResponseDTO> {
    const usuariosRepo = getRepository(Usuario);

    const usuario = await usuariosRepo.findOne({ where: { email } });

    if (!usuario) {
      throw new Error('Login incorreto.');
    }

    const senhaCoincide = await compare(senha, usuario.senha);

    if (!senhaCoincide) {
      throw new Error('Senha incorreta.');
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
