import { BaseController } from "@infrastructure/http/controllers/BaseController"
import { SyncRecordValuesController } from "@infrastructure/http/controllers/sync-record-values/SyncRecordValuesController";
import { makeLoadBlockById } from "@main/factories/use-cases/blocks/load-block-by-id-factory";

export const makeSyncRecordValuesController = (): BaseController => {
    const blockLoadByIdRepository = makeLoadBlockById();

    return new SyncRecordValuesController(
        blockLoadByIdRepository
    );
}