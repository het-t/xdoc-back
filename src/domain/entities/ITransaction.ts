export type ITransaction = {
    id: string,
    spaceId: string,
    debug: object,
    operations: IOperation[]
}

export type IOperation = {
    pointer: IPointer,
    additionalPointers: IPointer, 
    path: string[],
    command: string,
    args: object
}

export type IPointer = {
    table: string,
    id: string,
    spaceId?: string
}