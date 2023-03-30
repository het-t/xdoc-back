import {models} from '../models/index.js'

export default function recordDelete (req, res) {
    const {recordId} = req.query

    models.records_main.delete({
        userId: req.userId,
        recordId
    })
    .then(() => res.sendStatus(200))
    .catch(err => {
        res.sendStatus(500)
        logError(req.userId, 7, 2, fieldId, [err])
    })
}