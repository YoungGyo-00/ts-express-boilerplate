import express, { Router } from "express";
import { isNotLoggedIn } from "../middlewares/index";
import { AuthController } from "../../controllers/authController";

class AuthRouter {
    public router: Router = express.Router();
    private authController: AuthController;

    constructor() {
        this.router;
        this.authController = new AuthController();
        this.post();
    }

    post() {
        this.router.post("/signin", isNotLoggedIn, this.authController.signin);
        this.router.post("/signup", isNotLoggedIn, this.authController.signup);
    }
}

export default new AuthRouter().router;
