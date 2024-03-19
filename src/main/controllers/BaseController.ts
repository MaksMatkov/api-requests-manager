import { Database } from "sqlite3";
import { Entity } from "../../domain/abstractions/BaseEntity";
import { DbContext } from "../context";


interface IEntityConstructor<EntityType> {
  new (): EntityType;
}

//export type EntityType = Request | HttpMethod;

export abstract class BaseController <EntityType extends Entity>{

  constructor(protected _db : DbContext, protected table_name : string, protected entityConstructor: IEntityConstructor<EntityType>){
  }

  public LoadByID(id : number) : Promise<EntityType> {
    const query = `SELECT * FROM ${this.table_name} WHERE id = ? `;
    return new Promise((resolve, reject) => {
      this._db.get(query, [id], (err , row) => {
        if (err) {
          reject(err);
        } else {
          var res = new this.entityConstructor();
          res.FillFromJson(row);
          resolve(res);
        }
      });
    });
  }

  public LoadAll(): Promise<EntityType[]> {
    const query = ` SELECT * FROM ${this.table_name} `;

    return new Promise((resolve, reject) => {
      this._db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          console.log(rows)
          const results: EntityType[] = rows.map((row) => {
            const entity = new this.entityConstructor();
            entity.FillFromJson(row);
            return entity;
          });
          resolve(results);
        }
      });
    });
  }

  public Delete(id: number): Promise<boolean> {
    const query = `DELETE FROM ${this.table_name} WHERE id = ?`;
    return new Promise((resolve, reject) => {
      this._db.run(query, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          // Check if any rows were affected
          const rowsAffected = this.changes;
          resolve(rowsAffected > 0);
        }
      });
    });
  }

  private GetInsertSql(entity: EntityType): string {
    const columns = Object.keys(entity).filter(key => key !== 'id').join(', ');
    const values = Object.values(entity).filter(value => value !== undefined).map(value => `'${value}'`).join(', ');

    return `INSERT INTO ${this.table_name} (${columns}) VALUES (${values})`;
  }

  private GetUpdateSql(entity: EntityType): string {
    const setClause = Object.entries(entity)
      .filter(([key, value]) => key !== 'id' && value !== undefined)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(', ');

    return `UPDATE ${this.table_name} SET ${setClause} WHERE id = ${entity.id}`;
  }

  public Save(entity: EntityType): Promise<EntityType> {
    const insertQuery = this.GetInsertSql(entity);
    const updateQuery = this.GetUpdateSql(entity);

    return new Promise((resolve, reject) => {
      if (entity.id) {
        // Update existing entity
        this._db.run(updateQuery, [], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(entity);
          }
        });
      } else {
        // Insert new entity
        this._db.run(insertQuery, function (err) {
          if (err) {
            reject(err);
          } else {
            const newId = this.lastID;
            entity.id = newId;
            resolve(entity);
          }
        });
      }
    });
  }
}
