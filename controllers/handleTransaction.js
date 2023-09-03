import con from "../helpers/modelsCreateConnection.js";
import controllersHandleOperation from "../helpers/controllers.handleOperation.js";

const RATE_LIMIT = 50;

export default async function (req, res) {
    const {client, db} = con();
    const p = [];
    
    try {
        const { requestId, transactions } = req.body;

        for(let i = 0; i!==transactions.length && i<=RATE_LIMIT; i++) {
            const transaction = transactions[i];
            const { id, spaceId, debug, operations } = transaction;

            for(let j = 0; j!==operations.length && j<=RATE_LIMIT; j++) {
                const res = controllersHandleOperation(operations[i], db);
                p.push(res);
            }
        }

        await Promise.all(p);

        await client.close();

        res.status(200).send({success: 1});
    }
    catch (err) {
        console.log(err);
        if (err === 'COLLECTION_NOT_FOUND') {
            res.sendStatus(400)
        }
        res.sendStatus(500)
    }
}