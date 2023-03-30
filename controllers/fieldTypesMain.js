import logError from "../helpers/logError.js"
import {models} from '../models/index.js'

export default function fieldTypes (req, res) {

    models.fields_type_main.get({
        userId: req.userId,
    })
    .then(types => res.send(types))
    .catch(err => {
        console.log(err)
        res.sendStatus(500)
        logError(req.userId, 8, 11, null, [err])
    })
}