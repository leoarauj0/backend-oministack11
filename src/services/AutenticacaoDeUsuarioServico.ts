import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';

import { sign } from 'jsonwebtoken';

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

    // 1° parametro vai informações que podem ser desincriptadas
    // 3° parametro configurações do token
    const token = sign({}, '110d46fcd978c24f306cd7fa23464d73', {
      subject: usuario.id,
      expiresIn: '1d',
    });

    return {
      usuario,
      token,
    };
  }
}

export default AutenticacaoDeUsuarioServico;
