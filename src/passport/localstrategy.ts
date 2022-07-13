import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import passport from "passport";

import User from "../models/entities/user";
const LocalStrategy = passportLocal.Strategy;
const { USERNAMEFIELD, PASSWORDFIELD } = process.env;

export default () => {
    passport.use(
        new LocalStrategy(
            {
                // 첫번째 인자는 객체
                usernameField: USERNAMEFIELD,
                passwordField: PASSWORDFIELD || "password",
            },
            async (email, password, done) => {
                // 두번째 인자는 함수
                try {
                    const exUser = await User.findOne({
                        // 로그인할 유저가 DB에 있는지 확인
                        where: { usernameField: email },
                    });

                    if (!exUser) {
                        // 가입된 회원인지 확인
                        return done(null, false, {
                            message: "가입되지 않은 회원입니다",
                        });
                    }

                    const result = await bcrypt.compare(
                        password,
                        exUser.password,
                    );
                    if (!result) {
                        // 비밀번호가 맞는지 확인
                        return done(null, false, {
                            message: "비밀번호가 일치하지 않습니다",
                        });
                    }
                    return done(null, exUser); // 로그인 성공
                } catch (err: any) {
                    console.error(err.message);
                    done(err);
                }
            },
        ),
    );
};
