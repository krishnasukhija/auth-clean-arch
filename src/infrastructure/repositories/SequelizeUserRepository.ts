// src/infrastructure/repositories/SequelizeUserRepository.ts
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../entities/User";
import sequelize from "../database";
import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";

// Define Sequelize model attributes
interface UserAttributes {
  id: number;
  email: string;
  passwordHash: string;
  role: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "role"> {}

class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public passwordHash!: string;
  public role!: string;

  // timestamps are optional
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserModel.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
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

  async findById(id: number): Promise<User | null> {
    const found = await UserModel.findByPk(id);
    if (!found) return null;
    return new User(found.id, found.email, found.passwordHash, found.role);
  }
}
