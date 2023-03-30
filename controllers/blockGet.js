import makeDbReq from '../db/index.js'

export default function blockGet() {
    makeDbReq('blocks_master_get(?)', [
        req.query.blockId
    ])
    .then((results) => {
        res.sendStatus(200).send(results)
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(500).send("we are working on it")
    }) 
}