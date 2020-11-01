import { Router } from 'express';
import agendamentosRouter from './agendamentos.routes';
import sessoesRouter from './sessoes.routes';
import usuariosRouter from './usuarios.routes';

const routes = Router();

// Todas as rotas de agendamentos apontem para o router
routes.use('/agendamentos', agendamentosRouter);
routes.use('/usuarios', usuariosRouter);
routes.use('/sessoes', sessoesRouter);

export default routes;
