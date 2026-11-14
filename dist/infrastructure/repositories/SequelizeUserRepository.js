"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeUserRepository = void 0;
const User_1 = require("../../entities/User");
const database_1 = __importDefault(require("../database"));
const sequelize_1 = require("sequelize");
class UserModel extends sequelize_1.Model {
    id;
    email;
    passwordHash;
    role;
    // timestamps are optional
    createdAt;
    updatedAt;
}
UserModel.init({
    id: { type: sequelize_1.DataTypes.UUID, primaryKey: true },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    role: { type: sequelize_1.DataTypes.STRING, allowNull: false, defaultValue: "user" },
}, {
    sequelize: database_1.default,
    tableName: "users",
    timestamps: true,
});
class SequelizeUserRepository {
    async create(user) {
        const created = await UserModel.create({
            email: user.email,
            passwordHash: user.passwordHash,
            role: user.role ?? "user",
        });
        return new User_1.User(created.id, created.email, created.passwordHash, created.role);
    }
    async findByEmail(email) {
        const found = await UserModel.findOne({ where: { email } });
        if (!found)
            return null;
        return new User_1.User(found.id, found.email, found.passwordHash, found.role);
    }
    async findById(id) {
        const found = await UserModel.findByPk(id);
        if (!found)
            return null;
        return new User_1.User(found.id, found.email, found.passwordHash, found.role);
    }
}
exports.SequelizeUserRepository = SequelizeUserRepository;
