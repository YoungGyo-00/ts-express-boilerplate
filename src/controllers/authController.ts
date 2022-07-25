import { NextFunction, Request, Response } from "express";
import { OK } from "http-status-codes";
import passport from "passport";
import Container from "typedi";

import { UserRequestDto } from "@dtos/UserDto";
import { AuthService } from "@services/authService";

export class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = Container.get(AuthService);
    }

    signin = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req);
        passport.authenticate("local", async (err, user) => {
            if (err) {
                next({
                    status: err.status,
                    success: false,
                    message: err.message,
                    error: err,
                });
            }
            req.login(user, loginError => {
                if (loginError) {
                    next({
                        status: loginError.status,
                        success: false,
                        message: loginError.message,
                        error: loginError,
                    });
                }
                res.status(OK).send({
                    success: true,
                    message: `${user.email}님 로그인 성공`,
                    result: user,
                });
            });
        })(req, res, next);
    };

    signup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userDto: UserRequestDto = req.body;
            const result = await this.authService.signup(userDto);

            if (!result.success) throw result;

            res.status(result.status).send(result);
        } catch (err) {
            next(err);
        }
    };

    // logout = async (req: Request, res: Response, next: NextFunction) => {
    //     req.logout();
    //     req.session.destroy();
    //     res.status(OK).send({ message: "로그아웃" });
    // };
}
