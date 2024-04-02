import { IDbResponse } from "@application/interfaces/db/IDbResponse";

export namespace IGetJoinedTeamsByUserIdRepository {
  export type Request = {
    userId: string;
    spaceId: string;
  };
  export type Response = IDbResponse;
}

export interface IGetJoinedTeamsByUserIdRepository {
  getJoinedTeamsByUserId(
    { userId, spaceId }: IGetJoinedTeamsByUserIdRepository.Request
  ): Promise<IGetJoinedTeamsByUserIdRepository.Response>;
}
