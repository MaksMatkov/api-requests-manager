import { DbContext } from "../context";
import { RequestsStreamResultLogEntity } from "../entities/RequestsStreamResultLogEntity";
import { BaseController } from "./BaseController";

export class RequestsStreamResultLogController extends BaseController<RequestsStreamResultLogEntity> {
  constructor(_db : DbContext, table_name : string){
    super(_db, table_name, RequestsStreamResultLogEntity)
  }

  LoadAllByRequestsStreamId(id : number): Promise<RequestsStreamResultLogEntity[]> {
    const query = `SELECT * FROM ${this.table_name} WHERE requests_stream_id = ` + id;

    return new Promise((resolve, reject) => {
      this._db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const results: RequestsStreamResultLogEntity[] = rows.map((row) => {
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
