import { Router } from 'express';
import agendamentosRouter from './agendamentos.routes';

const routes = Router();

// Todas as rotas de agendamentos apontem para o router
routes.use('/agendamentos', agendamentosRouter);

export default routes;
