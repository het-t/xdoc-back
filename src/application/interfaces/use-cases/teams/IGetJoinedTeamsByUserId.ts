import { Team } from "@domain/interfaces/Team";
import { UseCase } from "../UseCase";

export namespace IGetJoinedTeamsByUserId {
  export type Request = {
    userId: string;
    spaceId: string;
  };
  export type Response = Promise<Team[]>;
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