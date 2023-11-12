import { User } from './user';

export type PersonType = {
    email: string;
}

export type PersonProps = {
    id: string;
    type?: string;
    name?: string;
    email: string;
    avatar_url?: string;
}

export class People extends User {
    public readonly person: PersonType;

    constructor(props: PersonProps) {
        super(props);
        this.person = {
            email: props.email
        }
    }
}