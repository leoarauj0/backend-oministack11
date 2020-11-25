import { Router } from 'express';
import agendamentosRouter from '@modules/agendamentos/infra/http/routes/agendamentos.routes';
import sessoesRouter from '@modules/usuarios/infra/http/routes/sessoes.routes';
import usuariosRouter from '@modules/usuarios/infra/http/routes/usuarios.routes';

const routes = Router();

// Todas as rotas de agendamentos apontem para o router
routes.use('/agendamentos', agendamentosRouter);
routes.use('/usuarios', usuariosRouter);
routes.use('/sessoes', sessoesRouter);

export default routes;
