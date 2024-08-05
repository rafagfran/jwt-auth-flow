import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
}

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {

  const { authorization } = req.headers

  // Verifica do authorization no header da requisição
  if (!authorization) {
    return res.status(401).json({ error: "Token not provided" })
  }

  // Usa a desestrturação de array, para separar os valores atravez do separador (" "), e pegar somente o valor de token
  // authorization.split(" "), transforma a string em um array de substrings usando o espaço " " como delimitador.
  const [prefix, token] = authorization.split(" ")

  try {
    // Verifica se o token passado,é equivalente ao token existente no bd
    // Aqui é passada a assinatura secreta para garantir que o token não foi alterado
    // **********ENTENDER COM FUNCIOAN ESTA ASSINATURA*******************
    const decode = verify(token, "b9f06830addad57fb4ea7f0bc4f2f784a1ef0154")

    
    const { id } = decode as TokenPayload;

    req.userId = id;

    next()
  } catch (error) {
    return res.status(401).json({ error: "Token Invalid" })
  }
}