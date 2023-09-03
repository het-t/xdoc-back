export default async function (properties, db) {
    const p = properties.map(
        async function (property) {
            const {page_id: pageId, name: nameRaw} = property;
            const propertyWithSameName = await db.collection('pages_properties').findOne({ page_id: pageId, name: nameRaw})

            if (propertyWithSameName !== null) {
                let suffix = 1;

                while(await db.collection('pages_properties').findOne({ page_id: pageId, name: `${nameRaw} ${suffix}`}) !== null) {
                    suffix++;
                };

                property.name = `${nameRaw} ${suffix}`;
            }
            return property
        }
    );

    const res = await Promise.all(p);

    return res;
}