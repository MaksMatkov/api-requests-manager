import { DbContext } from "../context";
import { RequestsStreamItemEntity } from "../entities/RequestsStreamItemEntity";
import { BaseController } from "./BaseController";

export class RequestsStreamItemController extends BaseController<RequestsStreamItemEntity> {
  constructor(_db : DbContext, table_name : string){
    super(_db, table_name, RequestsStreamItemEntity)
  }

  LoadAllByRequestsStreamId(id : number): Promise<RequestsStreamItemEntity[]> {
    const query = `SELECT * FROM ${this.table_name} WHERE requests_stream_id = ? `;

    return new Promise((resolve, reject) => {
      this._db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const results: RequestsStreamItemEntity[] = rows.map((row) => {
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
