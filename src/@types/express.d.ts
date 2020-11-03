declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
// Subistituição de tipo:
// Utilizamos esse para modificar a definição de tipo de um pacote como no caso o Express
//  que nao tinha o "user" pois precisavamos dele no garatirAutenticacao.ts
