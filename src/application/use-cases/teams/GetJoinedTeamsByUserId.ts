import { IGetJoinedTeamsByUserIdRepository } from "@application/interfaces/repositories/teams/IGetJoinedTeamsByUserIdRepository";
import { IGetJoinedTeamsByUserId } from "@application/interfaces/use-cases/teams/IGetJoinedTeamsByUserId";

export class GetJoinedTeamsByUserId
  implements IGetJoinedTeamsByUserId
{
  constructor(
    private readonly getJoinedTeamsByUserIdRepository: IGetJoinedTeamsByUserIdRepository
  ) {}

  async execute(
    { userId, spaceId }: IGetJoinedTeamsByUserId.Request
  ): Promise<IGetJoinedTeamsByUserId.Response> {
    return (
      await this.getJoinedTeamsByUserIdRepository.getJoinedTeamsByUserId({
        userId,
        spaceId
      })
    ).rows; 
  }
}
