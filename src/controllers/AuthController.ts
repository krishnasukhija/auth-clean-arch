// src/controllers/AuthController.ts
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { RegisterUserUseCase } from "../domain/application/usecases/RegisterUserUseCase";
import { AuthenticateUserUseCase } from "../domain/application/usecases/AuthenticateUserUseCase";
import { TYPES } from "../infrastructure/types";
import type { UserInterface } from "../infrastructure/utils/general.types";


@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.RegisterUserUseCase) private registerUserUseCase: RegisterUserUseCase,
    @inject(TYPES.AuthenticateUserUseCase) private authenticateUserUseCase: AuthenticateUserUseCase
  ) { }

  register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      // const { userInterface: UserInterface } = req.body;
      // const { email, password } = userInterface;
      const { user } = req.body;
      const { email, password } = user;
      const role = 'user';
      const userInstance = await this.registerUserUseCase.execute({ email, password });
      res.status(201).json({ id: userInstance.id, email: userInstance.email, role });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req.body;
      const { email, password } = user;
      const token = await this.authenticateUserUseCase.execute({ email, password });
      res.json({ token });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }
}
