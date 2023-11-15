export type CollectionProps = {
    id: string;
    type: string;
    collectionId: string;
    viewIds: string[],
    spaceId: string;
    properties: object;
    createdByTable: string;
    createdById: string;
    createdTime: Date;
    lastEditedBytable: string;
    lastEditedById: string;
    lastEditedTime: Date;
}

export class Collection {
    id: string;
    type: string;
    collectionId: string;
    viewIds: string[];
    spaceId: string;
    properties: object;
    createdTime?: Date;
    createdById: string;
    createdByTable: string;
    lastEditedtime?: Date;
    lastEditedById?: string;
    lastEditedByTable?: string;

    constructor(props: CollectionProps) {
        this.id = props.id;
        this.type = props.type;
        this.collectionId = props.collectionId;
        this.viewIds = props.viewIds;
        this.spaceId = props.spaceId;
        this.properties = props.properties;
        this.createdById = props.createdById;
        this.createdTime = props.createdTime;
        this.createdByTable = props.createdByTable;
        this.lastEditedtime = props.lastEditedTime;
        this.lastEditedByTable = props.lastEditedBytable;
        this.lastEditedById = props.lastEditedById;
    }
}