import * as dotenv from "dotenv";
dotenv.config({ path: "src/.env" });

const port = process.env.PORT;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;
const db_port = Number(process.env.DB_PORT);
const cookie_secret = process.env.COOKIE_SECRET;
const env: string = process.env.NODE_ENV || "development";

export {
    port,
    username,
    password,
    database,
    host,
    db_port,
    cookie_secret,
    env,
};
