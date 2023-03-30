import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import makeDbReq from '../db/index.js'

import {models} from '../models/index.js'

const login = (req, res) => {

    const {password, email} = req.body
    var userId = null

        models.users_main.login({username: email})
        // if no user exist throw err
        .then((userData)=>{
            if (!userData[0].userPassword) {
                throw "user not found"
            }
            else {
                userId = userData[0].userId
                return userData
            }
        })
        //compare it with input password
        .then((userData) => {
            return bcrypt.compare(password, userData[0].userPassword)
        })
        //jwt
        .then((verified)=>{
            if (verified != true) {
                throw "password not matching"
            }
        })
        .then(() =>{
            jwt.sign({userId}, 'secert', (err, token) => {
                if (err) {
                    throw err
                }
                else {                             
                    res.cookie('_token', token, {
                        signed: true
                    })
                    res.sendStatus(200)
                }
            })
        })
        .catch(err => {
            res.sendStatus(500)
            console.log(err)
            makeDbReq('logs_add(?, ?, ?, ?, ?)', [
                null,
                1,                  //activityId
                1,                 //tableid
                null,                  //tablePkId
                email + ' ' + err     //details
            ])
            // .catch((err) => console.log(err))
        }) 
    // }
}

export default login