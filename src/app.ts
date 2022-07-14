import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportConfig from "./passport";
import FileStore from "session-file-store";
import session from "express-session";
import cors from "cors";
import ApiRouter from "./api/routers/index";
import { port, cookie_secret } from "./config/index";

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
        this.app.set("port", port || 8080);
        passportConfig();

        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser(cookie_secret));
        this.app.use(
            session({
                resave: false,
                secret: cookie_secret || "secret",
                store: store,
                saveUninitialized: false,
                cookie: {
                    httpOnly: true,
                    secure: false,
                    maxAge: 1 * 60 * 60 * 1000,
                },
                rolling: true, // expiration reset
                genid: () => {
                    // 세션 ID 만들기, req 첨부된 일부 값을 사용하려면 첫 번째 인수로 req 제공
                    return "testCookie";
                },
            }),
        );
        this.app.use(passport.initialize());
        this.app.use(passport.session());
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
