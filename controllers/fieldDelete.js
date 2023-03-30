import logError from "../helpers/logError.js"
import {models} from "../models/index.js"

export default function fieldDelete (req, res) {
    const { fieldId } = req.query

    models.fields_main.delete({
        userId: req.userId,
        fieldId
    })
    .then(() => res.sendStatus(200))
    .catch(err => {
        res.sendStatus(500)
        logError(req.userId, 7, 2, fieldId, [err])
    })
}