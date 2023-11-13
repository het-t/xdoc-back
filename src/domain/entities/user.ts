export type ProfilePictureType = {
    url: string;
}

export type WorkspaceType = {
    id: string,
    name: string,
    icon: string,
    favourites: string[]
}

export type UserProps = {
    id: string;
    name?: string;
    email: string;
    password: string;
    isDarkMode: boolean;
    profilePicture: ProfilePictureType;
    workspaces: WorkspaceType[];
    createdAt: Date;
    editedAt: Date;
    avatarUrl?: string;
}

export class User {
    public readonly id: string;
    public readonly name: string;
    public readonly email: string;
    public readonly password: string;
    public readonly isDarkMode: boolean;
    public readonly profilePicture: ProfilePictureType;
    public readonly workspaces: WorkspaceType[];
    public readonly createdAt: Date;
    public readonly editedAt?: Date;
    public readonly avatarUrl?: string;

    constructor(props: UserProps) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.isDarkMode = props.isDarkMode;
        this.profilePicture = props.profilePicture;
        this.workspaces = props.workspaces;
        this.createdAt = props.createdAt;
        this.editedAt = props.editedAt;
        this.avatarUrl = props.avatarUrl;
    }
}