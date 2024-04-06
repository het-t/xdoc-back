import { BaseController } from "@infrastructure/http/controllers/BaseController"
import { SyncRecordValuesController } from "@infrastructure/http/controllers/sync-record-values/SyncRecordValuesController";
import { makeLoadBlocksByPointers } from "@main/factories/use-cases/blocks/load-blocks-by-pointers";

export const makeSyncRecordValuesController = (): BaseController => {
    const blockLoadByIdRepository = makeLoadBlocksByPointers();

    return new SyncRecordValuesController(
        blockLoadByIdRepository
    );
}