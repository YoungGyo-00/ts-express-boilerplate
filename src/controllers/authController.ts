import { NextFunction, Request, Response } from "express";
import { OK } from "http-status-codes";
import { Service } from "typedi";
import { UserRequestDto } from "../dto/UserDto";
import { AuthService } from "../services/authService";

@Service()
export class AuthController {
    constructor(private authService: AuthService) {}
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
