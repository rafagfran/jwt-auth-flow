import { Request, Response } from "express";
import { prisma } from "../utils/prisma"
import { hash } from "bcryptjs";

export class UserController {
  
  async index(req: Request, res: Response){
    const users = await prisma.user.findMany();
    return res.json({users})
  }

  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    // Verifica se o email existe no bd
    const userExist = await prisma.user.findUnique({where: {email}})

    if(userExist){
      return res.json({error: "User already exist"})
    }

    // Realiza a encriptação da senha com um salt round de 8
    const hash_password = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash_password
      }
    });

    return res.json({ user })
  }
}