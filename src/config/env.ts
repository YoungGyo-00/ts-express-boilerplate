import { config } from "dotenv";
config({ path: "src/.env" });

const port = process.env.PORT;
const _username = process.env._USERNAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;
const db_port = Number(process.env.DB_PORT);
const cookie_secret = process.env.COOKIE_SECRET;
const env: string = process.env.NODE_ENV || "development";

export {
    port,
    _username,
    password,
    database,
    host,
    db_port,
    cookie_secret,
    env,
};
