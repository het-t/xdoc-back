//Pages - create
export default async function create(db) {
    await db.collection('pages').insertOne(this);
};