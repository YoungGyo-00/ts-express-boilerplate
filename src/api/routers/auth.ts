import express, { Router } from "express";
import { isNotLoggedIn } from "../middlewares/index";
import { AuthController } from "../../controllers/authController";

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
        // this.router.get("/signin", isNotLoggedIn, this.authController.signin);
    }

    post() {
        this.router.post("/signup", isNotLoggedIn, this.authController.signup);
    }
}

export default new AuthRouter().router;
