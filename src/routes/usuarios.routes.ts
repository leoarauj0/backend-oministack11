/* eslint-disable camelcase */
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import garatirAutenticacao from '../middlewares/garantirAutenticacao';
import CriarUsuarioServico from '../services/CriarUsuarioServico';

import AddAvatarAoUsuarioServico from '../services/AddAvatarAoUsuarioServico';

const usuariosRouter = Router();

const upload = multer(uploadConfig);

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

// patch atualiza somente uma informação do usuario como no caso avatar
usuariosRouter.patch(
  '/avatar',
  garatirAutenticacao,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const addAvatarAoUsuario = new AddAvatarAoUsuarioServico();

      const usuario = await addAvatarAoUsuario.execute({
        usuario_id: req.user.id,
        nomeDoAvatar: req.file.filename,
      });

      usuario.senha = 'bleee!';

      return res.json(usuario);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);
export default usuariosRouter;
