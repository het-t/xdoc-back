import "module-alias/register";
import setUpApp from "@main/config/app";
import env from "@config/env";
import { knexPool } from "@infrastructure/db/postgres/knex/knex";

const app = setUpApp();

try {
    app.listen(env.port, () => {
        console.log("server is running: ", env.port);
        knexPool.raw("select now()")
        .then((res) => console.log(res.rows[0].now))
        .catch(err => console.log(err))
    });
}
catch (err) {
    console.log("server.ts", err)
}