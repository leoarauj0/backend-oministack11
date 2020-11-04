import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import autenticacaoConfig from '../config/autenticacao';

import AppError from '../errors/AppError';

interface TokenInfo {
  iat: number;
  exp: number;
  sub: string;
}

export default function garatirAutenticacao(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const autenticacaoCabecalho = req.headers.authorization;

  if (!autenticacaoCabecalho) {
    throw new AppError('Token não informado.', 401);
  }

  // o token  é dividido em duas partes:
  // {Bearer soiuahshaoishadaiodhq}

  // como não vamor usar a primeira posição que é a variavel Bearer
  // só colocamos a virgula e a desistruturação pegara apenas a segunda posição.
  const [, token] = autenticacaoCabecalho.split(' ');
  try {
    const decodificado = verify(token, autenticacaoConfig.jwt.secret);

    const { sub } = decodificado as TokenInfo;

    req.user = {
      id: sub,
    };

    console.log(decodificado);
    return next();
  } catch {
    throw new Error('Token inválido.');
  }
}
