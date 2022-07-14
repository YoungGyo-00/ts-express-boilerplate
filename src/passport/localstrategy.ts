import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import passport from "passport";
import { User } from "../models/entities/User";

const LocalStrategy = passportLocal.Strategy;

export default () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email, password, done) => {
                try {
                    const exUser = await User.findOne({
                        email: email,
                    });

                    if (!exUser) {
                        return done(null, false, {
                            message: "가입되지 않은 회원입니다",
                        });
                    }

                    const result = await bcrypt.compare(
                        password,
                        exUser.password,
                    );
                    if (!result) {
                        return done(null, false, {
                            message: "비밀번호가 일치하지 않습니다",
                        });
                    }
                    return done(null, exUser);
                } catch (err: any) {
                    console.error(err.message);
                    done(err);
                }
            },
        ),
    );
};
