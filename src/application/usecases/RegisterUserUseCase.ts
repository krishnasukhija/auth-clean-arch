// src/domain/usecases/RegisterUserUseCase.ts
import { injectable, inject } from "inversify";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { TYPES } from "../../infrastructure/inversify/types";
import type { hashFunction } from "../../sharedServices/IPasswordHasher";
import { RoleType } from "../../domain/entities/User";

// export type RoleType = 'admin' | 'user' | undefined;

export interface IRegisterUserInput {
  email: string;
  password: string;
  role?: RoleType;
}

@injectable()
export class RegisterUserUseCase {
  constructor(@inject(TYPES.IUserRepository) private readonly userRepo: IUserRepository) { }

  async execute(input: IRegisterUserInput, IPasswordHasher: hashFunction): Promise<User> {
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) {
      throw new Error("User already exists");
    }

    const passwordHash = await IPasswordHasher(input.password);

    // const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await this.userRepo.create({
      email: input.email,
      passwordHash,
      role: input.role,
    });
    return user;
  }
}
