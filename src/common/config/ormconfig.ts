import { configs } from "./db";
import { ConnectionOptions } from "typeorm";
import { env } from "./env";

const connectionOptions: ConnectionOptions = configs[env];

export { connectionOptions };
