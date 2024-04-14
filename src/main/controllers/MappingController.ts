import { DbContext } from "../context";
import { MappingEntity } from "../entities/MappingEntity";
import { BaseController } from "./BaseController";

export class MappingController extends BaseController<MappingEntity> {
  constructor(_db : DbContext, table_name : string){
    super(_db, table_name, MappingEntity)
  }

  LoadAllByRequestsStreamItemId(id : number): Promise<MappingEntity[]> {
    const query = `SELECT * FROM ${this.table_name} WHERE requests_stream_item_id = ` + id;

    return new Promise((resolve, reject) => {
      this._db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const results: MappingEntity[] = rows.map((row) => {
            const entity = new this.entityConstructor();
            entity.FillFromJson(row);
            return entity;
          });
          resolve(results);
        }
      });
    });
  }
}
