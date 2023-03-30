import {models} from '../models/index.js'
import logError from '../helpers/logError.js'

export default function recordList (req, res) {
    const {
        from,
        to
    } = req.query

    models.records_main.getRoots({
        userId: req.userId,
        from,
        to
    })
    .then(records => res.send(records))
    .catch(err => {
        res.sendStatus(500)
        logError(req.userId, 8, 7, null, [err])
    })
}