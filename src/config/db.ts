import path from "path";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { host, db_port, _username, password, database } from "./index";

const configs: Signature = {
    development: {
        type: "mysql",
        host: host,
        port: db_port,
        username: _username,
        password: password,
        database: database,
        timezone: "Z",
        namingStrategy: new SnakeNamingStrategy(),
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
        username: _username,
        password: password,
        database: database,
        timezone: "Z",
        namingStrategy: new SnakeNamingStrategy(),
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
