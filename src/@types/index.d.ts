/* eslint-disable @typescript-eslint/no-empty-interface */
import { ErrorSafety } from "./return";

declare global {
    export interface Mutation<T> extends ErrorSafety<T> {}
}
