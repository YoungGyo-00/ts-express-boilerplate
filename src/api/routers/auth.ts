import express, { Router } from "express";

import { AuthController } from "@controllers/authController";
import { isLoggedIn, isNotLoggedIn } from "@middlewares/index";

class AuthRouter {
    public router: Router = express.Router();
    private authController: AuthController;

    constructor() {
        this.router;
        this.authController = new AuthController();
        this.get();
        this.post();
    }

    get() {
        this.router.get("/logout", isLoggedIn, this.authController.signout);
    }

    post() {
        this.router.post("/signin", isNotLoggedIn, this.authController.signin);
        this.router.post("/signup", isNotLoggedIn, this.authController.signup);
    }
}

export default new AuthRouter().router;
