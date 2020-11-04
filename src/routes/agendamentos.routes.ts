/* eslint-disable camelcase */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AgendamentosRepo from '../repositories/AgendamentosRepo';
import CriarAgendamentoServico from '../services/CriarAgendamentoServico';

import garantirAutenticacao from '../middlewares/garantirAutenticacao';

const agendamentosRouter = Router();

agendamentosRouter.use(garantirAutenticacao);
// garate que todas as rotas seguintes usam esse autenticação
// se quisesse usar em uma rota expecifica era só passar a autenticacao como paramento: ('/', garantirAutenticacao, async (req, res.....

agendamentosRouter.get('/', async (req, res) => {
  const agendamentosRepo = getCustomRepository(AgendamentosRepo);
  const agendamentos = await agendamentosRepo.find();

  return res.json(agendamentos);
});

agendamentosRouter.post('/', async (req, res) => {
  const { provedor_id, data } = req.body;

  const dataArrumada = parseISO(data);

  const criarAgendamento = new CriarAgendamentoServico();

  const agendamento = await criarAgendamento.execute({
    data: dataArrumada,
    provedor_id,
  });

  return res.json(agendamento);
});

export default agendamentosRouter;
