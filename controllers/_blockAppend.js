import makeDbReq from "../db/index2.js"

export default function blockCreate(req, res) {
    makeDbReq('_blocks_main_append_block(?, ?, ?, @block_data); select @block_data as block_data', [
        req.userId,
        req.body.parentBlockId,
        JSON.stringify(req.body.childBlockData)
    ])
    .then(results => {
        res.status(200).send(JSON.parse(results[1][0].block_data))
    })
    .catch(err => {
        console.log(err)
        res.status(500).send("we're working on it")
    })
}