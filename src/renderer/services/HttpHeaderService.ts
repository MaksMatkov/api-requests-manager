import { HttpMethodModel } from "../models/HttpMethodModel";
import { BaseService } from "./BaseService";
import { HttpHeaderModel } from "../models/HttpHeaderModel";

class HttpHeaderService extends BaseService<HttpHeaderModel> {

  constructor() {
    super('HttpHeaderController.LoadByID', 'HttpHeaderController.LoadAll','HttpHeaderController.Delete','HttpHeaderController.Save', HttpHeaderModel);
  }

  LoadAllByRequestId(id: number): Promise<HttpHeaderModel[]> {
    return new Promise((resolve, reject) => {
      window.electron.ipcRenderer.once('HttpHeaderController.LoadAllByRequestId', (result : any) => {
        const results: HttpHeaderModel[] = (result as any[]).map((row) => {
          const entity = new this.modelConstructor();
          entity.FillFromJson(row);
          return entity;
        });
        resolve(results);
      });
      window.electron.ipcRenderer.sendMessage('HttpHeaderController.LoadAllByRequestId', id);
    });
  }
}

let httpHeaderService = new HttpHeaderService();
export {httpHeaderService};
