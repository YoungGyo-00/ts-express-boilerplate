import express, { Router } from "express";
import { isNotLoggedIn } from "../middlewares/index";
import { AuthController } from "../../controllers/authContoller";

class AuthRouter {
    public router: Router = express.Router();

    constructor() {
        this.router;
        this.post();
    }

    post() {
        this.router.post("/signup", isNotLoggedIn, AuthController.signup);
    }
}

export default new AuthRouter().router;
