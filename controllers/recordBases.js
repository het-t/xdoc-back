import {models} from '../models/index.js'
import logError from '../helpers/logError.js'

export default function recordBasesList (req, res) {
    const {
        rootRecordId,
    } = req.query


    models.records_main.getBaseRecords({
        userId: req.userId,
        rootRecordId
    })
    .then(recordsIds => res.json(recordsIds).end())
    .catch(err => {
        res.sendStatus(500)
        logError(req.userId, 8, 7, null, [err])
    })
}