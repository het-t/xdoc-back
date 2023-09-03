import Page from "../../models/pages.js";

export default async function(pageRaw, db) {   
    //validate keys with models
    const modeledPage = new Page(pageRaw);

    //insert in database
    await db.collection('pages').insertOne(modeledPage);
    
    //retrieve
    return modeledPage;
}