import {models} from "../models/index.js"
import logError from "../helpers/logError.js"

export default function userList (req, res, next) {
    const {
        from,
        to
    } = req.query

    models.users_main.get({
        userId: req.userId,
        from,
        to
    })
    .then(users => res.send(users))
    .catch(err => {
        res.sendStatus(500)
        logError(req.userId, 8, 1, null, [err])
    })
}