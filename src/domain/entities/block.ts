export type BlockProps = {
    id: string;
    type: string;
    permissions?: object;
    createdById?: string;
    createdTime?: Date;
    createdByTable?: string;
    lastEditedById?: string;
    lastEditedTime?: Date;
    lastEditebyByTable?: string;
    alive: boolean;
    spaceId: string;
}

export class Block {
    id: string;
    type: string;
    createdById?: string;
    createdTime?: Date;
    createdByTable?: string;
    lastEditedById?: string;
    lastEditedTime?: Date;
    lastEditedByTable?: string;
    alive: boolean;
    spaceId: string;

    constructor(props: BlockProps) {
        this.id = props.id;
        this.type = props.type;
        this.createdById = props.createdById;
        this.createdTime = props.createdTime;
        this.createdByTable = props.createdByTable;
        this.lastEditedByTable = props.lastEditebyByTable;
        this.lastEditedById = props.lastEditedById;
        this.lastEditedTime = props.lastEditedTime;
        this.alive = props.alive;
        this.spaceId = props.spaceId;
    }
}