import passport from "passport";
import local from "./localStrategy";
import { AuthRepository } from "../../models/repositories/authRepository";

const authRepository = new AuthRepository();

export default () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id: string, done) => {
        console.log(6);
        authRepository
            .findOneByEmail(id)
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();
};
