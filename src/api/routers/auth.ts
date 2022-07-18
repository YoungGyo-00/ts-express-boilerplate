import express, { Router } from "express";
import { isNotLoggedIn } from "../middlewares/index";
import { AuthController } from "../../controllers/authController";
import { Container } from "typedi";

class AuthRouter {
    public router: Router = express.Router();
    private authController: AuthController;

    constructor() {
        this.router;
        this.authController = Container.get(AuthController);
        this.post();
    }

    post() {
        this.router.post("/signup", isNotLoggedIn, this.authController.signup);
    }
}

export default new AuthRouter().router;
