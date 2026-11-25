import jwt from "jsonwebtoken";
// import { RoleType } from "../application/usecases/RegisterUserUseCase";
import { RoleType } from "../domain/entities/User";

export type tokenGenerator = (userId: string, userRole: Omit<RoleType, 'undefined'>) => string;

export const ITokenService: tokenGenerator = (userId, userRole) => {
    const token = jwt.sign({ sub: userId, role: userRole }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
    })
    return token;
}