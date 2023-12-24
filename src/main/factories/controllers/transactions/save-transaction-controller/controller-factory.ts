import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { SaveTransactions } from "@infrastructure/http/controllers/transactions/SaveTransactions";
import { makeCreateBlock } from "@main/factories/use-cases/blocks/create-block-factory";
import { makeUpdateBlockById } from "@main/factories/use-cases/blocks/update-block-by-id-factory";
import { makeUpdateCollectionView } from "@main/factories/use-cases/collection-view/update-collection-view-factory";
import { makeCreateCollection } from "@main/factories/use-cases/collection/create-collection-factory";
import { makeUpdateCollection } from "@main/factories/use-cases/collection/update-collection-factory";
import { makeListAfter } from "@main/factories/use-cases/space-view/list-after-factory";
import { makeListBefore } from "@main/factories/use-cases/space-view/list-before-factory";
import { makeListRemove } from "@main/factories/use-cases/space-view/list-remove-factory";

export const makeSaveTransactionsController = (): BaseController => {

    const createBlockUsecase = makeCreateBlock();
    const updateBlockByIdUsecase = makeUpdateBlockById();
    const listAfterUsecase = makeListAfter();
    const listBeforeUsecase = makeListBefore();
    const listRemoveUsecase = makeListRemove();
    const createCollectionUsecase = makeCreateCollection();
    const updateCollectionUsecase = makeUpdateCollection();
    const updateCollectionViewUsecase = makeUpdateCollectionView();
    
    return new SaveTransactions(
        createBlockUsecase,
        updateBlockByIdUsecase,
        listAfterUsecase,
        listBeforeUsecase,
        listRemoveUsecase,
        createCollectionUsecase,
        updateCollectionUsecase,
        updateCollectionViewUsecase
    );
}