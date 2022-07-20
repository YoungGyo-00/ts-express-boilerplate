import passport from "passport";
import local from "./localStrategy";
import { User } from "../../models/entities/User";

export default () => {
    passport.serializeUser((user: User, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id: string, done) => {
        User.findOne({
            where: { email: id },
        })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();
};
