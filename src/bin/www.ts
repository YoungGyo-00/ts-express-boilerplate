import "reflect-metadata";
import app from "../app";
import { createConnection, useContainer } from "typeorm";
import { connectionOptions } from "../config/ormconfig";
import Container from "typedi";

// useContainer(Container);
createConnection(connectionOptions)
    .then(() => {
        console.log("DB Connection");

        app.listen(app.get("port"), () => {
            console.log(app.get("port") + "연결 성공");
        });
    })
    .catch(err => {
        console.error(err);
    });
