import { UUID } from "crypto";
import { UseCase } from "../UseCase";
import { Space } from "@domain/interfaces/Space";

export namespace ICreateWorkspaceInterface {
    export type Request = {
        name: string,
        createdById: UUID
    };
    export type Response = UUID | Error; 
}

export interface ICreateWorkspaceInterface extends UseCase<
    ICreateWorkspaceInterface.Request,
    ICreateWorkspaceInterface.Response
> {
    execute(
        { name, createdById }: ICreateWorkspaceInterface.Request
    ): Promise<ICreateWorkspaceInterface.Response>;
}