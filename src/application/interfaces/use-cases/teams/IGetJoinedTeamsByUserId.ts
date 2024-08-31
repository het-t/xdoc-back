import { Team } from "@domain/interfaces/Team";
import { UseCase } from "../UseCase";
import { IDbResponse } from "@application/interfaces/db/IDbResponse";

export namespace IGetJoinedTeamsByUserId {
  export type Request = {
    userId: string;
    spaceId: string;
  };
  export type Response = IDbResponse<Team[]>;
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