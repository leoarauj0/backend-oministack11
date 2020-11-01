/* eslint-disable camelcase */
import { Router } from 'express';

import AutenticacaoDeUsuarioServico from '../services/AutenticacaoDeUsuarioServico';

const sessoesRouter = Router();

sessoesRouter.post('/', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const autenticacaoDeUsuario = new AutenticacaoDeUsuarioServico();

    const { usuario } = await autenticacaoDeUsuario.execute({
      email,
      senha,
    });

    // @Starlord
    // a porra do delete nao queria funcionar entao eis a pegadinha
    // delete usuario.senha;
    usuario.senha = 'bleee!';

    return res.json({ usuario });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default sessoesRouter;
