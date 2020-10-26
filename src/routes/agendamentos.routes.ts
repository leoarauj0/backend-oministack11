import { Router } from 'express';
import { parseISO } from 'date-fns';

import AgendamentosRepo from '../repositories/AgendamentosRepo';
import CriarAgendamentoServico from '../services/CriarAgendamentoServico';

const agendamentosRouter = Router();
const agendamentosRepo = new AgendamentosRepo();

agendamentosRouter.get('/', (req, res) => {
  const agendamentos = agendamentosRepo.todosAgendamentos();

  return res.json(agendamentos);
});

agendamentosRouter.post('/', (req, res) => {
  try {
    const { provedor, data } = req.body;

    const dataArrumada = parseISO(data);

    const CriarAgendamento = new CriarAgendamentoServico(agendamentosRepo);

    const agendamento = CriarAgendamento.execute({ data: dataArrumada, provedor });

    return res.json(agendamento);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default agendamentosRouter;
