import { UUID } from "crypto"
import { DbTable } from "./DbTable";
import { SpacePermission } from "./SpacePermission";
import { SpacePlanType } from "./SpacePlanType";
import { SpaceSetting } from "./SpaceSetting";
import { SpaceSubscriptionTier } from "./SpaceSubscriptionTier";

export type Space = {
    id: UUID;
    icon?: string;
    name: string;
    permissions: SpacePermission[];
    created_time: number;
    last_edited_time: number;
    created_by_table: DbTable;
    created_by_id: UUID;
    last_edited_by_table: DbTable;
    last_edited_by_id: UUID;
    plan_type: SpacePlanType;
    invite_link_enabled: boolean;
    settings: SpaceSetting;
    subscription_tier: SpaceSubscriptionTier;
}