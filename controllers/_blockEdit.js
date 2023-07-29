import makeDbReq from "../db/index2.js"

export default function blockCreate(req, res) {
    makeDbReq('_blocks_main_edit(?, ?, ?, @block_data); select @block_data as block_data', [
        req.userId,
        req.params.blockId,
        JSON.stringify(req.body.data)
    ])
    .then(results => {
        res.status(200)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send("we're working on it")
    })
}