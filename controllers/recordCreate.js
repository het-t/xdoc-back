import {models} from "../models/index.js"
import logError from "../helpers/logError.js"

export default function recordCreate (req, res, next) {
    const {
        record,
        parentRecordId,
        rootRecordId
    } = req.body.params
    
    models.records_main.create({
        userId: req.userId,
        record,
        parentRecordId,
        rootRecordId
    })
    .then(results => res.send({recordId: results[0].createdRecordId}))
    .catch(err => {
        console.log(err)
        res.sendStatus(500)
        logError(
            req.userId,
            5,
            7,
            null,
            [err]
        )
    })
}