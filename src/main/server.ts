import setUpApp from "@main/config/app";
import env from "config/env";

const app = setUpApp();
try {
    app.listen(env.port, () => {
        console.log("server is running")
    })
}
catch (err) {
    console.log(err)
}