import makeDbReq from "../db/index2.js"

export default function pagesGet(req, res) {
    makeDbReq('_pages_main_retrieve_pages(?)', [req.userId])
    .then(results => {
        res.status(200).send(results[0])
    })
    .catch(err => {
        console.log(err)
        res.status(500).send("we're working on it")
    })
}