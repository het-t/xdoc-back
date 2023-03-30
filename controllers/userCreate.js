import {models} from "../models/index.js"
import logError from "../helpers/logError.js"
import {hash} from 'bcrypt'

export default function userCreate (req, res, next) {
    const {
        username,
        password
    } = req.body.params

    hash(password, 3)
    .then((hashPassword) => {
        models.users_main.create({
            userId: req.userId,
            username,
            hashPassword
        })
        .then(result => res.send({userId: result[0].createdUserId}))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
            logError(req.userId, 2, 1, null, [err])
        })
    })
}