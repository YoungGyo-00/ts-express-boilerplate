import { NextFunction, Request, Response } from "express";

const isNotLoggedIn = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        if (!req.isAuthenticated()) {
            next();
        } else {
            throw { status: 403, message: "로그인 상태입니다" };
        }
    } catch (err) {
        console.error("\nmiddleware index.js isNotLoggedIn에서 에러");
        next(err);
    }
};

export { isNotLoggedIn };
