import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Usuario from '../models/usuario';

interface RequestDTO {
  nome: string;
  email: string;
  senha: string;
}

class CriarUsuarioServico {
  public async execute({ nome, email, senha }: RequestDTO): Promise<Usuario> {
    const usuariosRepo = getRepository(Usuario);

    const emailJaExiste = await usuariosRepo.findOne({
      where: { email },
    });

    if (emailJaExiste) {
      throw new Error('Email já existe.');
    }

    const hashiandoSenha = await hash(senha, 8);

    const usuario = usuariosRepo.create({
      nome,
      email,
      senha: hashiandoSenha,
    });

    await usuariosRepo.save(usuario);

    return usuario;
  }
}

export default CriarUsuarioServico;
