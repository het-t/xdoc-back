import { ILoadBlocksByPointersRepository } from "@application/interfaces/repositories/blocks/ILoadBlocksByPointersRepository";
import { IGetBlockPermissionsByIdsRepository } from "@application/interfaces/repositories/blocks/IGetBlockPermissionsByIdsRepository";
import { knexPool } from "../knex/knex";

export class BlockRepository implements 
  ILoadBlocksByPointersRepository,
  IGetBlockPermissionsByIdsRepository
{
  async loadBlocksByPointers(
    { table, ids }: ILoadBlocksByPointersRepository.Request
  ): Promise<ILoadBlocksByPointersRepository.Response> {
    let sp = "";

    switch (table) {
      case "block": {
        sp = "select * from blocks_get_by_ids(?::uuid[]);";
        break;
      }

      case "collection": {
        sp = "select * from collections_get_by_ids(?::uuid[]);";
        break;
      }

      case "xdoc_space": {
        sp = "select * from xdoc_spaces_get_by_ids(?);";
        return await knexPool.raw(
          sp,
          [ids]
        )
      }

      case "collection_view": {
        sp = "select * from collection_views_get_by_ids(?::uuid[]);"
        break;
      }

      case "space_user": {
        sp = "select * from space_user_get_by_ids(?::uuid[]);"
        break;
      }

      case "xdoc_user": {
        sp = "select * from xdoc_user_get_by_ids(?::uuid[]);";
        return await knexPool.raw(
          sp,
          [ids]
        );
      }

      default: {
        return new Error("INVALID TABLE: " + table);
      }
    }
    
    return await knexPool.raw(sp, [
      ids
    ]);
  }

  async getBlockPermissionsByIds(
    { ids, userId }: IGetBlockPermissionsByIdsRepository.Request
  ): Promise<IGetBlockPermissionsByIdsRepository.Response> {
    return await knexPool.raw(
      "select * from block_get_permissions_memberships(?, ?);",
      [ids, userId]
    );
  }
}
