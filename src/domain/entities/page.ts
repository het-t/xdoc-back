import { Block } from "./block";

export type PageProps = {
    id: string;
    type: "page";
    spaceId: string;
    parentId?: string;
    parentTable?: string;
    permissions?: object;
    createdById?: string;
    createdTime?: Date;
    createdByTable?: string;
    lastEditedById?: string;
    lastEditedTime?: Date;
    lastEditebyByTable?: string;
    alive: boolean;
}

export class Page extends Block {
    public readonly type = "page";

    constructor(props: PageProps) {
        super(props);
    }
}