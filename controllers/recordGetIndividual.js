import {models} from '../models/index.js'
import logError from '../helpers/logError.js'

export default function recordGetIndividual (req, res) {
    const {
        recordId,
    } = req.query

    models.records_main.getIndividual({
        userId: req.userId,
        recordId
    })
    .then(record => res.send(record))
    .catch(err => {
        res.sendStatus(500)
        logError(req.userId, 8, 7, null, [err])
    })
}