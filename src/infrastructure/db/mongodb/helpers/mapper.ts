import { ObjectId } from "mongodb";

export const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);

export const stringToObjectId = (string: string): ObjectId => {
    return new ObjectId(string);
}

export const objectIdToString = (objectId: ObjectId): string => {
    return objectId.toHexString();
}

export const mapDocument = (document: any): any => {
    const { _id, ...rest } = document;
    const id = objectIdToString(_id);
    return { ...rest, id };
}

export const mapToDocument = (rawDocument: any): any => {
    const { id, ...rest } = rawDocument;
    return { ...rest, _id: id };
}