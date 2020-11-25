import { hash } from 'bcryptjs';
import AppError from '@compartilhado/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Usuario from '../infra/typeorm/entities/usuario';

import IUsuariosRepo from '../repositories/IUsuariosRepo';

interface IRequestDTO {
  nome: string;
  email: string;
  senha: string;
}

@injectable()
class CriarUsuarioServico {
  constructor(
    @inject('UsuariosRepo')
    private usuariosRepo: IUsuariosRepo,
  ) {}

  public async execute({ nome, email, senha }: IRequestDTO): Promise<Usuario> {
    const emailJaExiste = await this.usuariosRepo.encontrarPorEmail(email);

    if (emailJaExiste) {
      throw new AppError('Email já existe.');
    }

    const hashiandoSenha = await hash(senha, 8);

    const usuario = await this.usuariosRepo.create({
      nome,
      email,
      senha: hashiandoSenha,
    });

    return usuario;
  }
}

export default CriarUsuarioServico;
