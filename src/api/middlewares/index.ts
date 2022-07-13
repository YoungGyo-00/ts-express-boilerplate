import { NextFunction, Request, Response } from "express";
import { ISLOGGEDIN } from "../../errors/error";

const isNotLoggedIn = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        if (!req.isAuthenticated()) {
            next();
        } else {
            throw new ISLOGGEDIN();
        }
    } catch (err) {
        console.error("\nmiddleware index.js isNotLoggedIn에서 에러");
        next(err);
    }
};

export { isNotLoggedIn };
