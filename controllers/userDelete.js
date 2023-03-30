import {models} from "../models/index.js"
import logError from "../helpers/logError.js"

export default function userDelete(req, res) {
    const { userId } = req.query

    models.users_main.delete({
        userId: req.userId,
        delUserId: userId
    })
    .then(() => res.sendStatus(200))
    .catch(err => {
        res.sendStatus(500)
        logError(req.userId, 8, 1, userId, [err])
    })
}