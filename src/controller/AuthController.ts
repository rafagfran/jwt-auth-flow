  import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthController {
  async authenticate(req: Request, res: Response){
    const { email, password } = req.body

    const user  = await prisma.user.findUnique({where: { email }})

    if(!user){
      return res.json({error: "User not found"})
    }

    const isValidPass = await compare(password, user.password)

    if(!isValidPass){
      return res.json({error: "Password is not correct!"})
    }

    const token  = sign({id: user.id}, "b9f06830addad57fb4ea7f0bc4f2f784a1ef0154", {expiresIn: "1d"})

    return res.json({user, token})
  }
}