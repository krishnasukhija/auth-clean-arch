// src/infrastructure/types.ts
export const TYPES = {
  IUserRepository: Symbol.for("IUserRepository"),
  RegisterUserUseCase: Symbol.for("RegisterUserUseCase"),
  AuthenticateUserUseCase: Symbol.for("AuthenticateUserUseCase"),
  AuthController: Symbol.for("AuthController"),
};
