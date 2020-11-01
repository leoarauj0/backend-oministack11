import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';

import Usuario from '../models/usuario';

interface RequestDTO {
  email: string;
  senha: string;
}

interface ResponseDTO {
  usuario: Usuario;
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

    return {
      usuario,
    };
  }
}

export default AutenticacaoDeUsuarioServico;
