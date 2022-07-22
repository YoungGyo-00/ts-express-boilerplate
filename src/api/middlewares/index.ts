import { Request, Response, NextFunction } from "express";
import { Forbidden } from "../../common/errors/error";

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.isAuthenticated()) {
            next();
        } else {
            throw new Forbidden("로그인이 필요한 상태입니다 .");
        }
    } catch (err) {
        next(err);
    }
};

const isNotLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.isAuthenticated());
        if (!req.isAuthenticated()) {
            next();
        } else {
            throw new Forbidden("이미 로그인 중입니다.");
        }
    } catch (err) {
        next(err);
    }
};

export { isLoggedIn, isNotLoggedIn };
