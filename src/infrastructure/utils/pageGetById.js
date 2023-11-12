//Pages - get by id
export default async function getById(id, db) {
    const res = await db.collection('pages').find({id}).toArray();
    
    return res;
};