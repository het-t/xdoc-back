export default async function(operation, db) {
    // don't know the use-case of `additionalUpdatedPointers`
    // ********* //
    const { pointer: { table, id }, command, args, additionalUpdatedPointers, path } = operation;

    console.log("command => ", command, "table => ", table);
    
    if (table === 'block') {
        if (command === 'set') {
            const {id, space_id} = args;

            //database - insert
            return await db.collection('block').insertOne({
                id,
                type: "page",
                space_id
            });
        }

        else if (command === "update") {
            // must check if path is valid

            // ************************** //
            const hasRestrictedPropertyAccess = path.find((property) => {
                return property !== 'properties'
            })

            if (hasRestrictedPropertyAccess?.length !== 0 && hasRestrictedPropertyAccess) throw "CAN_NOT_ACCESS_REQUESTED_PROPERTY";

            const joinedPath = path.join('.');

            return await db.collection('block').updateOne({id}, {
                $set: 
                    path.length === 0 ?
                    args :    
                    {
                        [`${joinedPath}`]: args
                    }
            });
        }

        else if (command === 'setParent') {
            const {parentTable, parentId} = args;

            //validating parent
            const parent = {}

            if (parentTable === "database") {
                parent.type = "database_id";
                parent.database_id = parentId;
            }
            else if (parentTable === "page") {
                parent.type = "page_id";
                parent.page_id = parentId;
            }
            else if (parentTable === "workspace") {
                parent.type = "workspace";
                parent.workspace = true;
            }
            else if (parentTable === "block") {
                parent.type = "block_id";
                parent.block_id = parentId;
            }
            else {
                throw "INVALID_PARENT_TABLE"
            }

            //saving in database
            return await db.collection('block').updateOne({id}, {
                $set: {
                    parent
                }
            })
        }
    }

    else if (table === "collection") {
        const joinedPath = path.join('.');

        if (command === "update") {
            let p = [];
            for (let key in args) {
                const updatePath = path.length === 0 ? 
                             `${key}` :
                             `${joinedPath}.${key}`;

                p.push(
                    await db.collection("collection").updateOne({id}, {
                        $set: {
                            [updatePath] : args[key]
                        }
                    })
                );
            }

            return Promise.all(p);
        }

        else if (command === "set") {   
            //if document don't exist insert one     
            if (path.length === 0) {
                await db.collection("collection").insertOne(args);
            }    

            //if document exists update
            else {
                await db.collection("collection").updateOne({id}, {
                    $set: {
                        [`${joinedPath}`]: args
                    }
                })
            }
        }
    }
    
    else {
        throw "COLLECTION_NOT_FOUND"
    }
}