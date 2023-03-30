import logError from "../helpers/logError.js"
import {models} from '../models/index.js'

export default function fieldList (req, res, next) {
    const {
        from,
        to
    } = req.query

    models.fields_main.get({
        userId: req.userId,
        from,
        to
    })
    .then(fields => res.send(fields))
    .catch(err => {
        res.sendStatus(500)
        logError(req.userId, 8, 2, null, [err])
    })
}