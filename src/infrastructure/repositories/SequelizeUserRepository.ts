// src/infrastructure/repositories/SequelizeUserRepository.ts
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import sequelize from "../database";
import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";

// Define Sequelize model attributes
interface UserAttributes {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "role"> { }

class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: string;
  declare email: string;
  declare passwordHash: string;
  declare role: string;

  // timestamps are optional
  declare createdAt: Date;
  declare updatedAt: Date;
}

UserModel.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);


export class SequelizeUserRepository implements IUserRepository {
  async create(user: { email: string; passwordHash: string; role?: string }): Promise<User> {
    const created = await UserModel.create({
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role ?? "user",
    });
    return new User(created.id, created.email, created.passwordHash, created.role);
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await UserModel.findOne({ where: { email } });
    if (!found) return null;
    return new User(found.id, found.email, found.passwordHash, found.role);
  }

  async findById(id: string): Promise<User | null> {
    const found = await UserModel.findByPk(id);
    if (!found) return null;
    return new User(found.id, found.email, found.passwordHash, found.role);
  }

  // async addRole(userId: number, roleId: number): Promise<void> {

  // }

  // async getRoles(userId: number): Promise<number[]> {
  // }
}
