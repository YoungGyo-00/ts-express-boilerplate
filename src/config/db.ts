import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: "src/.env" });

const { _USERNAME, PASSWORD, DATABASE, HOST, DB_PORT } = process.env;

const configs: config = {
    development: {
        type: "mysql",
        host: HOST,
        port: Number(DB_PORT),
        username: _USERNAME,
        password: PASSWORD,
        database: DATABASE,
        synchronize: true,
        logging: true,
        dropSchema: false,
        entities: [
            path.join(
                __dirname,
                "..",
                "models",
                "entities",
                "**",
                "*{.js,.ts}",
            ),
        ],
    },

    production: {
        type: "mysql",
        host: HOST,
        port: Number(DB_PORT),
        username: _USERNAME,
        password: PASSWORD,
        database: DATABASE,
        synchronize: true,
        logging: true,
        dropSchema: false,
        entities: [
            path.join(
                __dirname,
                "..",
                "models",
                "entities",
                "**",
                "*{.js,.ts}",
            ),
        ],
    },
};

export { configs };
