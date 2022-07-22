import passport from "passport";
import local from "./localStrategy";
import { AuthRepository, User } from "../../models/repositories/authRepository";

const authRepository = new AuthRepository();

export default () => {
    passport.serializeUser((user: User, done) => {
        console.log(user.email);
        done(null, user.email);
    });

    passport.deserializeUser((id: string, done) => {
        console.log(6);
        authRepository
            .findOneByEmail(id)
            .then(user => {
                console.log(user);
                done(null, user);
            })
            .catch(err => done(err));
    });

    local();
};
