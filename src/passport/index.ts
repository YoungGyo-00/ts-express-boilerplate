// 인증 전략을 등록, 데이터 저장 + 불러오는 기능
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

import local from "./localStrategy"; // 로컬 서버로 로그인
import User from "../models/entities/user";

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
