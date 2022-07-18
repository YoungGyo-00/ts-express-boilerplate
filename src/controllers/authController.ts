import { NextFunction, Request, Response } from "express";
import { OK } from "http-status-codes";
import { Service } from "typedi";
import { AuthService } from "../services/authService";

@Service()
export class AuthController {
    constructor(private authService: AuthService) {}
    signup = async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.authService.signup();
        res.status(OK).send(result);
    };
}
