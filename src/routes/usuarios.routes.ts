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
  const { nome, email, senha } = req.body;

  const CriarUsuario = new CriarUsuarioServico();

  const usuario: Usuario = await CriarUsuario.execute({
    nome,
    email,
    senha,
  });

  delete usuario.senha;

  return res.json(usuario);
});

// patch atualiza somente uma informação do usuario como no caso avatar
usuariosRouter.patch(
  '/avatar',
  garatirAutenticacao,
  upload.single('avatar'),
  async (req, res) => {
    const addAvatarAoUsuario = new AddAvatarAoUsuarioServico();

    const usuario = await addAvatarAoUsuario.execute({
      usuario_id: req.user.id,
      nomeDoAvatar: req.file.filename,
    });

    usuario.senha = 'bleee!';

    return res.json(usuario);
  },
);
export default usuariosRouter;
