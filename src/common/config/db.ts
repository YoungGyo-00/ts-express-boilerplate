import path from "path";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { HOST, DB_PORT, _USERNAME, PASSWORD, DATABASE } from "./env";

const configs: Signature = {
    development: {
        type: "mysql",
        host: HOST,
        port: DB_PORT,
        username: _USERNAME,
        password: PASSWORD,
        database: DATABASE,
        timezone: "Z",
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: true,
        logging: true,
        dropSchema: false,
        entities: [path.join("src", "models", "entities", "**", "*{.js,.ts}")],
    },

    production: {
        type: "mysql",
        host: HOST,
        port: DB_PORT,
        username: _USERNAME,
        password: PASSWORD,
        database: DATABASE,
        timezone: "Z",
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: true,
        logging: true,
        dropSchema: false,
        entities: [path.join("src", "models", "entities", "**", "*{.js,.ts}")],
    },
};

export { configs };
