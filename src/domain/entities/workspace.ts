export type WorkspaceProps = {
    id: string;
    name: string;
    icon: string;
    favourites: string[];
    createdAt: Date;
    editedAt: Date
}

export class Workspace {
    public readonly id: string;
    public readonly name: string;
    public readonly icon: string;
    public readonly favourites: string[];
    public readonly createdAt: Date;
    public readonly editedAt: Date;

    constructor(props: WorkspaceProps) {
        this.id = props.id;
        this.name = props.name;
        this.icon = props.icon;
        this.favourites = props.favourites;
        this.createdAt = props.createdAt;
        this.editedAt = props.editedAt;
    }
}