import con from '../helpers/modelsCreateConnection.js';
import uuid from '../helpers/modelsUUIDGen.js';

function Block() {};

Block.prototype.getById = getById;
Block.prototype.create = create;

//block - get by id
async function getById(blockId) {
    const {client, db} = con();
    const res = await db.collection('blocks').find({id: blockId}).toArray();
    await client.close();
    return res
}

//block - create new
async function create() {
    const {client, db} = con();
    this.data.id = uuid();
    await db.collection('blocks').insertOne(this.data);
    await client.close();
}

export default Block