/* eslint-disable camelcase */
import { Router } from 'express';

import garantirAutenticacao from '@modules/usuarios/infra/http/middlewares/garantirAutenticacao';
import AgendamentoController from '../controllers/AgendamentosController';

const agendamentosRouter = Router();
const agendamentoController = new AgendamentoController();

// garate que todas as rotas seguintes usam esse autenticação
// se quisesse usar em uma rota expecifica era só passar a autenticacao como paramento: ('/', garantirAutenticacao, async (req, res.....
agendamentosRouter.use(garantirAutenticacao);

agendamentosRouter.post('/', agendamentoController.create);

export default agendamentosRouter;
