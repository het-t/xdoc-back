import User from "../models/users.js";
import con from "../helpers/modelsCreateConnection.js";

export default async function (req, res) {
    
    const client = con();

    try {

        await client.connect();

        let user = {};

        user.db = client.db('xdoc');
        user.collection = {
            users: user.db.collection('users'),
            userPasswords: user.db.collection('users_passwords')
        };

        const { username, password } = req.body;

        const isPasswordValid = await User.prototype.authByPassword.call(user, username, password);
        
        if (isPasswordValid === true) {
            res.status(200).send({success: 1});
        }
        else {
            res.status(401).send({success: 0});
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).send({err});
    }
    finally {
        client.close();
    }
}