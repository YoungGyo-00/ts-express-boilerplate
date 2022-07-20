import { NextFunction, Request, Response } from "express";
import { OK } from "http-status-codes";
import { Service } from "typedi";
import { UserRequestDto } from "../dto/UserRequestDTO";
import { AuthService } from "../services/authService";

@Service()
export class AuthController {
    constructor(private authService: AuthService) {}
    signup = async (req: Request, res: Response, next: NextFunction) => {
        const userDto: UserRequestDto = req.body;
        const result = await this.authService.signup(userDto);
        res.status(OK).send(result);
    };
}
