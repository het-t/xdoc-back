import logError from "../helpers/logError.js"
import {models} from '../models/index.js'

export default function fieldCreate (req, res) {
    const {
        ownerId,
        fieldName,
        fieldType,
        fieldDes
    } = req.body.params

    models.fields_main.create({
        userId: req.userId,
        ownerId,
        fieldName,
        fieldType,
        fieldDes
    })
    .then(result => res.send({fieldId: result[0].createdFieldId}))
    .catch(err => {
        console.log(err)
        res.sendStatus(500)
        logError(req.userId, 6, 2, null, [err])
    })
}