// src/controllers/AuthController.ts
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { RegisterUserUseCase } from "../domain/usecases/RegisterUserUseCase";
import { AuthenticateUserUseCase } from "../domain/usecases/AuthenticateUserUseCase";
import { TYPES } from "../infrastructure/types";

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.RegisterUserUseCase) private registerUserUseCase: RegisterUserUseCase,
    @inject(TYPES.AuthenticateUserUseCase) private authenticateUserUseCase: AuthenticateUserUseCase
  ) {}

  async register(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;
      const user = await this.registerUserUseCase.execute({ email, password, role });
      res.status(201).json({ id: user.id, email: user.email, role: user.role });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.authenticateUserUseCase.execute({ email, password });
      res.json({ token });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }
}
