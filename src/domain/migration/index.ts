import path from "path";
import { DbContext } from "../../main/context";
import { app } from "electron";

console.log("START MIGRATION")

let dbContext : DbContext = new DbContext(path.join(app.getPath('userData'), 'index.db'), true);

console.log("END MIGRATION")
