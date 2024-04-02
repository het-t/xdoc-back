import { ILoadBlockByPointerRepository } from "@application/interfaces/repositories/blocks/ILoadBlockByPointerRepository";
import { pool } from "../helpers/db-connection";

export class BlockRepository implements ILoadBlockByPointerRepository {
  async loadBlockByPointer(
    pointer: ILoadBlockByPointerRepository.Request
  ): Promise<ILoadBlockByPointerRepository.Response> {
    const filter: {
      space_id?: string;
      id: string;
    } = {
      id: pointer.id,
    };

    if (pointer.spaceId) filter.space_id = pointer.spaceId;

    let sp = "";
    let args = {};

    switch (pointer.table) {
      case "block": {
        sp = "select * from block_get_by_id(?);";
        args = [pointer.id];
        break;
      }
      case "collection": {
        sp = "select * from collection_get_by_id(?);";
        args = [pointer.id];
        break;
      }
      case "xdoc_user": {
        sp = "select * from xdoc_user_get_by_id(?);";
        args = [pointer.id];
        break;
      }
      case "xdoc_space": {
        sp = "select * from xdoc_space_get_by_id(?);";
        args = [pointer.id];
        break;
      }
      case "team": {
        sp = 'select * from team_get_by_id(?);';
        args = [pointer.id];
        break;
      }
    }

    return await pool.raw(sp, args);
  }
}
