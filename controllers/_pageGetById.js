import makeDbReq from "../db/index2.js";

export default function pageGetById(req, res) {
    makeDbReq('_pages_main_retrieve_page_by_id(?, ?, @pageData); select @pageData as page_data;', [
        req.params.id,
        req.userId
    ])
    .then(results => {
        res.status(200).send(JSON.parse(results[1][0].page_data))
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
}