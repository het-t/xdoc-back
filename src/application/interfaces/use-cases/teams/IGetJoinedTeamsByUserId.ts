import { UseCase } from "../UseCase";

export namespace IGetJoinedTeamsByUserId {
  export type Request = {
    userId: string;
    spaceId: string;
  };
  export type Response = Team[];
}

export interface IGetJoinedTeamsByUserId
  extends UseCase<
    IGetJoinedTeamsByUserId.Request,
    IGetJoinedTeamsByUserId.Response
  > {
  execute(
    {userId, spaceId}: IGetJoinedTeamsByUserId.Request
  ): Promise<IGetJoinedTeamsByUserId.Response>;
}

type Team = {
  id: string;
  name: string;
  description: string;
  created_by_id: string;
  last_edited_by_id: string;
  created_by_table: string;
  last_edited_by_table: string;
  created_time: number;
  last_edited_time: number;
  is_default: boolean;
  team_pages: string[];
  space_id: string;
  parent_id: string;
  parent_table: string;
  settings: object;
  permissions: object;
  memberships: object;
}