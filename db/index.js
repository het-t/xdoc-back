import con from './conDb.js'
// import db from '../models/index.js'

const makeDbReq = (sp, replacements) => {
    // return new Promise((resolve, reject) => {
        return con.query(
            `CALL ${sp}`,
            replacements,
            // (err, results) => {
            //     if (err) {
            //         console.log(err)
            //         reject(err)
            //     } 
            //     else {
            //         resolve(results?.[0]) 
            //     }
            // }
        )
    // })
}

export default makeDbReq