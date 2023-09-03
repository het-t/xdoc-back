import validationResolvePagePropertyNameConflict from "../../helpers/validation.resolvePagePropertyNameConflict.js";
import PageProperty from "../../models/pageProperties.js";

export default async function (pageId, properties, db) {
    //validate properties with models
    const modeledProperties = [];

    for (let key in properties) {
        modeledProperties.push(
            new PageProperty({
                pageId,
                name: key,
                value: properties[key]
            })
        )
    };

    //resolve duplicate property names conflicts
    const validatedProperties = await validationResolvePagePropertyNameConflict(modeledProperties, db);

    //bulk create new properties
    await db.collection('pages_properties').insertMany(validatedProperties);
    
    //retrieve
    return validatedProperties;
}