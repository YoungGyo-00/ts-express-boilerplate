import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportConfig from "./passport";
import FileStore from "session-file-store";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import ApiRouter from "./api/routes/index";
const { PORT, COOKIE_SECRET } = process.env;
const sessionStore = FileStore(session);
const store = new sessionStore();

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.setMiddleWare();
        this.setStatic();
        this.getRouter();
        this.errorHandler();
    }

    setMiddleWare() {
        this.app.set("port", PORT || 8080);
        passportConfig();

        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json()); // json Request Body 파싱
        this.app.use(express.urlencoded({ extended: false })); // x-www-form-urlencoded 형태 데이터 파싱, querystring(false), qs(true)
        this.app.use(cookieParser(COOKIE_SECRET)); // 암호화(서명)된 쿠키 발급
        this.app.use(
            session({
                resave: false, // 세션 데이터가 바뀌기 전까지 세션저장소의 값을 저장할지 여부
                secret: COOKIE_SECRET || "secret", // cookieParser와 같은 signed(서명) 사용
                store: store, // mysql(실제 배포 시) 에 세션을 저장할 수도 있음
                saveUninitialized: false, // 세션이 필요하기 전에 세션 구동할지 여부
                cookie: {
                    // 세션 쿠키 설정
                    httpOnly: true, // JS를 통해 세션 쿠키를 사용할 수 없도록 설정
                    secure: false, // http 환경에서만 사용(개발 단계)
                    maxAge: 1 * 60 * 60 * 1000, // 1시간 설정
                },
                rolling: true, // expiration reset
                genid: () => {
                    // 세션 ID 만들기, req 첨부된 일부 값을 사용하려면 첫 번째 인수로 req 제공
                    return "testCookie";
                },
            }),
        );
        this.app.use(passport.initialize()); // passport 구성을 위한 미들웨어
        this.app.use(passport.session()); // passport.deserializeUser() Method 실행
    }

    setStatic() {
        // this.app.use('/', express.static(path.join(__dirname + 'public')));
    }

    getRouter() {
        this.app.use(ApiRouter);
    }

    errorHandler() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const err: any = new Error(
                `${req.method} ${req.url} 라우터가 없습니다`,
            );
            err.status = 404;
            next(err);
        });

        // eslint-disable-next-line no-unused-vars
        this.app.use(
            (err: any, req: Request, res: Response, next: NextFunction) => {
                res.locals.message = err.message;
                res.locals.error =
                    process.env.NODE_ENV !== "production" ? err : {};
                res.status(err.status || 500);

                console.error(err);
                res.json({ message: err.message });
            },
        );
    }
}

export default new App().app;
