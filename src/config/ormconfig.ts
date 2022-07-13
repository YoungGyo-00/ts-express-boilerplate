import { configs } from "./db";
import { ConnectionOptions } from "typeorm";

const env = process.env.NODE_ENV || "development";

const connectionOptions: ConnectionOptions = configs[env];

export default connectionOptions;
