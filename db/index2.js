import con from './conDb.js'

const makeDbReq = (sp, replacements) => {
    return new Promise((resolve, reject) => {
        return con.query(
            `CALL ${sp}`,
            replacements,
            (err, results) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } 
                else {
                    resolve(results) 
                }
            }
        )
    })
}

export default makeDbReq