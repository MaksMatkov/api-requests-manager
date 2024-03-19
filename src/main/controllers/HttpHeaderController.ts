import { DbContext } from "../context";
import { HttpHeaderEntity } from "../entities/HttpHeaderEntity";
import { BaseController } from "./BaseController";

export class HttpHeaderController extends BaseController<HttpHeaderEntity> {
  constructor(_db : DbContext, table_name : string){
    super(_db, table_name, HttpHeaderEntity)
  }

  LoadAllByRequestId(id : number): Promise<HttpHeaderEntity[]> {
    const query = `SELECT * FROM ${this.table_name} WHERE request_id = ? `;

    return new Promise((resolve, reject) => {
      this._db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const results: HttpHeaderEntity[] = rows.map((row) => {
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
