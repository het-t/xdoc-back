//Pages - construct page to be created
export default function Page({id, properties, parent}) {
    const currentTimeStamp = new Date();

    this.object = "page";
    this.id = id;
    this.created_time = currentTimeStamp;
    this.last_edited_time = currentTimeStamp;

    // ****************** //
    // static data alert below in users
    // need changes
    this.created_by = {
        object: "user",
        id: "dedcec81-2ff3-408d-bca6-325396f9388e"
    };
    this.last_edited_by = {
        object: "user",
        id: "dedcec81-2ff3-408d-bca6-325396f9388e"
    };
    // *******************//

    this.parent = parent;
    this.properties = properties;
};