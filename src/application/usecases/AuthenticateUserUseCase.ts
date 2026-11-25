// src/domain/usecases/AuthenticateUserUseCase.ts
import { injectable, inject } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import type { compareFunction } from "../../sharedServices/IPasswordHasher";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TYPES } from "../../infrastructure/inversify/types";
import type { tokenGenerator } from "../../sharedServices/ITokenService"
// import { RoleType } from "./RegisterUserUseCase";
import { RoleType } from "../../domain/entities/User";



// dotenv.config();

export interface IAuthenticateUserInput {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {

  constructor(@inject(TYPES.IUserRepository) private readonly userRepo: IUserRepository) { }

  async execute(input: IAuthenticateUserInput, IPasswordComparer: compareFunction, ITokenService: tokenGenerator): Promise<string> {
    const user = await this.userRepo.findByEmail(input.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const valid = await IPasswordComparer(input.password, user.passwordHash);
    if (!valid) {
      throw new Error("Invalid credentials");
    };
    // const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET!, {
    //   expiresIn: "1h",
    // });
    const token = ITokenService(user.id as string, user.role as Omit<RoleType, 'undefined'>)

    return token;
  }
}
