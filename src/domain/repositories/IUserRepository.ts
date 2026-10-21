// src/domain/repositories/IUserRepository.ts
import { User } from "../../entities/User";
export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    create(user: Partial<User>): Promise<User>;
    addRole(userId: number, roleId: number): Promise<void>;
    getRoles(userId: number): Promise<number[]>; // returns role ids
}
