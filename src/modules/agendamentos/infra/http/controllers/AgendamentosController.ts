import { Request, Response } from 'express';

import { parseISO } from 'date-fns';

import { container } from 'tsyringe';

import CriarAgendamentoServico from '@modules/agendamentos/services/CriarAgendamentoServico';

export default class AgendamentoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { provedor_id, data } = req.body;

    const dataArrumada = parseISO(data);

    const criarAgendamento = container.resolve(CriarAgendamentoServico);

    const agendamento = await criarAgendamento.execute({
      data: dataArrumada,
      provedor_id,
    });

    return res.json(agendamento);
  }
}
