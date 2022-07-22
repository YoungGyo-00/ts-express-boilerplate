import { NextFunction, Request, Response } from "express";
import { OK } from "http-status-codes";
import Container from "typedi";
import { UserRequestDto } from "../dto/UserDto";
import { AuthService } from "../services/authService";

export class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = Container.get(AuthService);
    }

    signin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.authService.signin(req);
            console.log(4);
            res.status(OK).send(result);
        } catch (err) {
            next(err);
        }
    };

    signup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userDto: UserRequestDto = req.body;
            const result = await this.authService.signup(userDto);

            if (!result.success) throw result;

            res.status(OK).send(result);
        } catch (err) {
            next(err);
        }
    };
}
