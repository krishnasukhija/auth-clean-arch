// src/domain/usecases/RegisterUserUseCase.ts
import { injectable } from "inversify";
import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../../entities/User";
import bcrypt from "bcrypt";

export interface IRegisterUserInput {
  email: string;
  password: string;
  role?: string;
}

@injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(input: IRegisterUserInput): Promise<User> {
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) {
      throw new Error("User already exists");
    }
    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await this.userRepo.create({
      email: input.email,
      passwordHash,
      role: input.role,
    });
    return user;
  }
}
