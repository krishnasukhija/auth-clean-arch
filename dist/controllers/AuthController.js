"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const inversify_1 = require("inversify");
const RegisterUserUseCase_1 = require("../domain/usecases/RegisterUserUseCase");
const AuthenticateUserUseCase_1 = require("../domain/usecases/AuthenticateUserUseCase");
const types_1 = require("../infrastructure/types");
let AuthController = class AuthController {
    registerUserUseCase;
    authenticateUserUseCase;
    constructor(registerUserUseCase, authenticateUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
        this.authenticateUserUseCase = authenticateUserUseCase;
    }
    async register(req, res) {
        try {
            const { email, password } = req.body;
            const role = null;
            const user = await this.registerUserUseCase.execute({ email, password });
            res.status(201).json({ id: user.id, email: user.email, role: user.role });
        }
        catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await this.authenticateUserUseCase.execute({ email, password });
            res.json({ token });
        }
        catch (err) {
            res.status(401).json({ error: err.message });
        }
    }
};
exports.AuthController = AuthController;
exports.AuthController = AuthController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.RegisterUserUseCase)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.AuthenticateUserUseCase)),
    __metadata("design:paramtypes", [RegisterUserUseCase_1.RegisterUserUseCase,
        AuthenticateUserUseCase_1.AuthenticateUserUseCase])
], AuthController);
