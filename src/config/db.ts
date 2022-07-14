import path from "path";
import { host, db_port, username, password, database } from "./index";

const configs: Signature = {
    development: {
        type: "mysql",
        host: host,
        port: db_port,
        username: username,
        password: password,
        database: database,
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
        host: host,
        port: Number(db_port),
        username: username,
        password: password,
        database: database,
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
