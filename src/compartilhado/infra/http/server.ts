import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import uploadConfig from '@config/upload';
import AppError from '@compartilhado/errors/AppError';
import routes from './routes';
import '@compartilhado/infra/typeorm';
import '@compartilhado/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.diretorio));
app.use(routes);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(`${err}❌`);

  return res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server iniciado na porta 3333  🚀 🚀');
});
