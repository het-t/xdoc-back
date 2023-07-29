import makeDbReq from "../db/index2.js";

export default function (req, res) {

    makeDbReq('_pages_main_create(?, ?, ?, @page_data); select @page_data as page_data', [
        req.body.id,
        req.body.title,
        req.userId
    ])
    .then((results) => {
        res.status(200).send(JSON.parse(results[1][0]?.page_data))
    })
    .catch(err => {
        console.log(err)
        res.status(500).send("We're working on it")
    })
}