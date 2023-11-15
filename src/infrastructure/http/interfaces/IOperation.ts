export type IPointer = {
    table: string;
    id: string;
    spaceId: string;
}

export type IOperation<T = any> = {
    pointer: IPointer;
    path: string[];
    command: string;
    args: T;
    additionalPointer?: IPointer[];
}