import * as configs from "./db";
import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = configs["development"];

export default connectionOptions;
