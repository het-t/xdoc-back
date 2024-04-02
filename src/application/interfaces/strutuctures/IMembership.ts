export type Membership = {
    entity_type: string;
    type: 'member' | 'owner';
    user_id: string;
}