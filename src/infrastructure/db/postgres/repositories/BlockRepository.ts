import { ILoadBlocksByPointersRepository } from "@application/interfaces/repositories/blocks/ILoadBlocksByPointersRepository";
import { pool } from "../helpers/db-connection";

export class BlockRepository implements ILoadBlocksByPointersRepository {
  async loadBlocksByPointers(
    { table, ids, spaceId }: ILoadBlocksByPointersRepository.Request
  ): Promise<ILoadBlocksByPointersRepository.Response> {
    let sp = "";

    switch (table) {
      case "block": {
        sp = "select * from blocks_get_by_ids(?, ?);";
        break;
      }
      case "collection": {
        sp = "select * from collections_get_by_ids(?, ?);";
        break;
      }
      // case "xdoc_user": {
      //   sp = "select * from xdoc_user_get_by_id(?, ?);";
      //   break;
      // }
      case "xdoc_space": {
        sp = "select * from xdoc_spaces_get_by_ids(?);";
        return await pool.raw(
          sp,
          [ids]
        )
      }
      default: {
        return new Error("INVALID TABLE: " + table);
      }
      // case "team": {
      //   sp = 'select * from team_get_by_id(?, ?);';
      //   break;
      // }
    }
    return await pool.raw(sp, [
      ids, 
      spaceId
    ]);
  }
}
