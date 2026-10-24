// src/domain/usecases/AuthenticateUserUseCase.ts
import { injectable, inject } from "inversify";
import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TYPES } from "../../infrastructure/types";


dotenv.config();

export interface IAuthenticateUserInput {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {

  constructor(@inject(TYPES.IUserRepository) private readonly userRepo: IUserRepository) { }

  async execute(input: IAuthenticateUserInput): Promise<string> {
    const user = await this.userRepo.findByEmail(input.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return token;
  }
}
