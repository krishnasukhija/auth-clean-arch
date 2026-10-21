// src/infrastructure/container.ts
import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { SequelizeUserRepository } from "../infrastructure/repositories/SequelizeUserRepository";
import { RegisterUserUseCase } from "../domain/usecases/RegisterUserUseCase";
import { AuthenticateUserUseCase } from "../domain/usecases/AuthenticateUserUseCase";
import { AuthController } from "../controllers/AuthController";

const container = new Container();

container.bind<IUserRepository>(TYPES.IUserRepository).to(SequelizeUserRepository).inSingletonScope();
container.bind<RegisterUserUseCase>(TYPES.RegisterUserUseCase).to(RegisterUserUseCase);
container.bind<AuthenticateUserUseCase>(TYPES.AuthenticateUserUseCase).to(AuthenticateUserUseCase);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

export { container };
