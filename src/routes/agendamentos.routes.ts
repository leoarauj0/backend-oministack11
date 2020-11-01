/* eslint-disable camelcase */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AgendamentosRepo from '../repositories/AgendamentosRepo';
import CriarAgendamentoServico from '../services/CriarAgendamentoServico';

const agendamentosRouter = Router();

agendamentosRouter.get('/', async (req, res) => {
  const agendamentosRepo = getCustomRepository(AgendamentosRepo);
  const agendamentos = await agendamentosRepo.find();

  return res.json(agendamentos);
});

agendamentosRouter.post('/', async (req, res) => {
  try {
    const { provedor_id, data } = req.body;

    const dataArrumada = parseISO(data);

    const criarAgendamento = new CriarAgendamentoServico();

    const agendamento = await criarAgendamento.execute({
      data: dataArrumada,
      provedor_id,
    });

    return res.json(agendamento);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default agendamentosRouter;
