import { Request, Response, NextFunction } from "express";
import { ISLOGGEDIN } from "../../common/errors/error";

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
        next(err);
    }
};

export { isNotLoggedIn };
