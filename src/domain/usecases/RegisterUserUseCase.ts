// src/domain/usecases/RegisterUserUseCase.ts
import { injectable, inject } from "inversify";
import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../../entities/User";
import bcrypt from "bcrypt";
import { TYPES } from "../../infrastructure/types";

export type RoleType = 'admin' | 'user' | undefined;

export interface IRegisterUserInput {
  email: string;
  password: string;
  role?: RoleType;
}

@injectable()
export class RegisterUserUseCase {
  constructor(@inject(TYPES.IUserRepository) private readonly userRepo: IUserRepository) { }

  async execute(input: IRegisterUserInput): Promise<User> {
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) {
      throw new Error("User already exists");
    }
    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await this.userRepo.create({
      email: input.email,
      passwordHash,
      role: input.role,
    });
    return user;
  }
}
