import { IGetSpaceUsersRepository } from "@application/interfaces/repositories/users/IGetSpaceUsersRepository";
import { IGetSpaceUsers } from "@application/interfaces/use-cases/users/IGetSpaceUsers";

export class GetSpaceUsers implements IGetSpaceUsers {
    constructor(
        private readonly getSpaceUsersRepository: IGetSpaceUsersRepository
    ) { }

    async execute(
        spaceId: IGetSpaceUsers.Request
    ): Promise<IGetSpaceUsers.Response> {
        const spaceUsers =  await this.getSpaceUsersRepository.getSpaceUsers({spaceId});
        
        return spaceUsers.map((user) => {
            return {
                userId: user.user_id,
                role: user.membership_type
            }
        });
    }
}