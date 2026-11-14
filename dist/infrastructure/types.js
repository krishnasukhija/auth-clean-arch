"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPES = void 0;
// src/infrastructure/types.ts
exports.TYPES = {
    IUserRepository: Symbol.for("IUserRepository"),
    RegisterUserUseCase: Symbol.for("RegisterUserUseCase"),
    AuthenticateUserUseCase: Symbol.for("AuthenticateUserUseCase"),
    AuthController: Symbol.for("AuthController"),
};
