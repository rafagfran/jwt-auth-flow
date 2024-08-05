import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
}

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {

  const { authorization } = req.headers

  if(!authorization){
    return res.status(401).json({error: "Token not provided"})
  }

  const [, token] = authorization.split(" ")

  try {
    const decode = verify(token, "b9f06830addad57fb4ea7f0bc4f2f784a1ef0154")
    const { id } = decode as TokenPayload;

    req.userId = id;
    
    next()
  } catch (error) {
    return res.status(401).json({error: "Token Invalid"})
  }
}