import { RequestsStreamItemModel } from "../models/RequestsStreamItemModel";
import { BaseService } from "./BaseService";

class RequestsStreamItemService extends BaseService<RequestsStreamItemModel> {
  constructor() {
    super('RequestsStreamItemController.LoadByID', 'RequestsStreamItemController.LoadAll','RequestsStreamItemController.Delete','RequestsStreamItemController.Save', RequestsStreamItemModel);
  }

  LoadAllByRequestsStreamId(id: number): Promise<RequestsStreamItemModel[]> {
    return new Promise((resolve, reject) => {
      window.electron.ipcRenderer.once('RequestsStreamItemController.LoadAllByRequestsStreamId', (result : any) => {
        const results: RequestsStreamItemModel[] = (result as any[]).map((row) => {
          const entity = new this.modelConstructor();
          entity.FillFromJson(row);
          return entity;
        });
        resolve(results);
      });
      window.electron.ipcRenderer.sendMessage('RequestsStreamItemController.LoadAllByRequestsStreamId');
    });
  }
}

let requestsStreamItemService = new RequestsStreamItemService();
export {requestsStreamItemService};
