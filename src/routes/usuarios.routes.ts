/* eslint-disable camelcase */
import { Router } from 'express';
import CriarUsuarioServico from '../services/CriarUsuarioServico';

const usuariosRouter = Router();

interface Usuario {
  nome: string;
  email: string;
  senha?: string;
}

usuariosRouter.post('/', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const CriarUsuario = new CriarUsuarioServico();

    const usuario: Usuario = await CriarUsuario.execute({
      nome,
      email,
      senha,
    });

    delete usuario.senha;

    return res.json(usuario);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default usuariosRouter;
