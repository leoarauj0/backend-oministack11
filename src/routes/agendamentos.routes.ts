import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AgendamentosRepo from '../repositories/AgendamentosRepo';

const agendamentosRouter = Router();
const agendamentosRepo = new AgendamentosRepo();

agendamentosRouter.get('/', (req, res) => {
  const agendamentos = agendamentosRepo.todosAgendamentos();

  return res.json(agendamentos);
});

agendamentosRouter.post('/', (req, res) => {
  const { provedor, data } = req.body;

  const dataArrumada = startOfHour(parseISO(data));

  const dataEmUso = agendamentosRepo.encontrarPorData(dataArrumada);

  if (dataEmUso) {
    return res.status(400).json({ message: 'Este horário ja está agendado' });
  }

  const agendamento = agendamentosRepo.create({ provedor, data: dataArrumada });
  return res.json(agendamento);
});

export default agendamentosRouter;
