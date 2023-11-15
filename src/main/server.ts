import "module-alias/register";
import setUpApp from "@main/config/app";
import env from "@config/env";
import dbConnection from "@infrastructure/db/mongodb/helpers/db-connection";

const app = setUpApp();
try {
    dbConnection.connect(env.mongoUrl)
    .then(() => {
        app.listen(env.port, () => {
            console.log("server is running: ", env.port)
        })
    })
}
catch (err) {
    console.log("server.ts", err)
}