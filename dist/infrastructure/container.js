"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
// src/infrastructure/container.ts
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const SequelizeUserRepository_1 = require("../infrastructure/repositories/SequelizeUserRepository");
const RegisterUserUseCase_1 = require("../domain/usecases/RegisterUserUseCase");
const AuthenticateUserUseCase_1 = require("../domain/usecases/AuthenticateUserUseCase");
const AuthController_1 = require("../controllers/AuthController");
const container = new inversify_1.Container();
exports.container = container;
container.bind(types_1.TYPES.IUserRepository).to(SequelizeUserRepository_1.SequelizeUserRepository).inSingletonScope();
container.bind(types_1.TYPES.RegisterUserUseCase).to(RegisterUserUseCase_1.RegisterUserUseCase);
container.bind(types_1.TYPES.AuthenticateUserUseCase).to(AuthenticateUserUseCase_1.AuthenticateUserUseCase);
container.bind(types_1.TYPES.AuthController).to(AuthController_1.AuthController);
