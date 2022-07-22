import { configs } from "./db";
import { ConnectionOptions } from "typeorm";
import { ENV } from "./env";

const connectionOptions: ConnectionOptions = configs[ENV];

export { connectionOptions };
