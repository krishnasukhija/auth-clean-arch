import type { Request, Response, NextFunction } from 'express';


export type Middleware = (req: Request, res: Response, next: NextFunction) => any;


export type UserInterface = {
    email: string,
    password: string
}



// export interface UserInterface { email: string, password: string };