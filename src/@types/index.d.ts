/* eslint-disable @typescript-eslint/no-empty-interface */
import { ErrorSafety } from "./return";
import UserModel from "../models/entities/user";

declare global {
    export interface Mutation<T> extends ErrorSafety<T> {}
    namespace Express {
        export interface User extends UserModel {}
    }
}
