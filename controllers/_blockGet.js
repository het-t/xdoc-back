import makeDbReq from '../db/index2.js'

export default function blockGet(req, res) {

    makeDbReq('_blocks_main_retrieve_block_by_id(?, ?, @block_data); select @block_data as block_data', [
        req.query.id,
        req.userId
    ])
    .then((results) => {
        res.status(200).send(results[1][0].block_data)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send("we are working on it")
    }) 
}