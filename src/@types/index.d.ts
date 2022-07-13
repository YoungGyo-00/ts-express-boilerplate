/* eslint-disable @typescript-eslint/no-empty-interface */
import { ErrorSafety } from "./return";
import UserModel from "../models/entities/user";
import { ConnectionOptions } from "typeorm";

declare global {
    interface Mutation<T> extends ErrorSafety<T> {}

    namespace Express {
        interface User extends UserModel {}
    }

    interface config {
        [key: string]: ConnectionOptions; // index signature
    }
}
