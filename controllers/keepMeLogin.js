import makeDbReq from "../db/index.js"
import jwt from 'jsonwebtoken'

export default function keepMeLogin (req, res) {

    jwt.verify(req.signedCookies._token, 'secert', (err, decoded) => {
        if (err) {
            makeDbReq(`logs_add(?, ?, ?, ?, ?)`, [
                null,
                1,                  //activityId
                1,                 //tableid
                null,                  //tablePkId
                email + ' ' + err     //details
            ])
            res.sendStatus(500)
        } else {
            req.userId = decoded.userId
            makeDbReq(`logs_add(?, ?, ?, ?, ?)`, [
                req.userId,
                1,
                1,
                req.userId,
                'success'
            ])
            res.sendStatus(200)
        }
    })
}