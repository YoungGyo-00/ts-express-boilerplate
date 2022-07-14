import { configs } from "./db";
import { ConnectionOptions } from "typeorm";
import { env } from "./index";

const connectionOptions: ConnectionOptions = configs[env];

export { connectionOptions };
