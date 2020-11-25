/* eslint-disable camelcase */
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import garatirAutenticacao from '../middlewares/garantirAutenticacao';
import UsuarioController from '../controllers/UsuariosController';
import UsuarioAvatarController from '../controllers/UsuarioAvatarController';

const usuariosRouter = Router();
const usuarioController = new UsuarioController();
const usuarioAvatarController = new UsuarioAvatarController();

const upload = multer(uploadConfig);

usuariosRouter.post('/', usuarioController.create);

// patch atualiza somente uma informação do usuario como no caso avatar
usuariosRouter.patch(
  '/avatar',
  garatirAutenticacao,
  upload.single('avatar'),
  usuarioAvatarController.update,
);
export default usuariosRouter;
