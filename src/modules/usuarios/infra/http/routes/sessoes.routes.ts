/* eslint-disable camelcase */
import { Router } from 'express';
import SessoesController from '../controllers/SessoesController';

const sessoesRouter = Router();
const sessoesController = new SessoesController();

sessoesRouter.post('/', sessoesController.create);

export default sessoesRouter;
