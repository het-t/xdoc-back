export const preparePathedUpdate = function(joinedPath: string, args: object) {
    const update: Record<string, any> = {};

    for (let key in args) {
        update[joinedPath + "." + key] = args[key as keyof Object];
    }

    return update;
}