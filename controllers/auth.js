import jwt from 'jsonwebtoken'

/**
 * authenticate user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const auth = (req, res, next) => {
    jwt.verify(req.signedCookies._token, 'secert', (err, decoded) => {
        if (err) {
            res.sendStatus(403)
            console.log("invalid jwt")
        } else {
            req.userId = decoded.userId
            next()
        }
    })
}

export default auth;