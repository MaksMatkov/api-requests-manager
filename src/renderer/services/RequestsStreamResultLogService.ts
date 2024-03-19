import { RequestsStreamResultLogModel } from "../models/RequestsStreamResultLogModel";
import { BaseService } from "./BaseService";

class RequestsStreamResultLogService extends BaseService<RequestsStreamResultLogModel> {
  constructor() {
    super('RequestsStreamResultLogController.LoadByID', 'RequestsStreamResultLogController.LoadAll','RequestsStreamResultLogController.Delete','RequestsStreamResultLogController.Save', RequestsStreamResultLogModel);
  }

  LoadAllByRequestsStreamId(id: number): Promise<RequestsStreamResultLogModel[]> {
    return new Promise((resolve, reject) => {
      window.electron.ipcRenderer.once('RequestsStreamResultLogController.LoadAllByRequestsStreamId', (result : any) => {
        const results: RequestsStreamResultLogModel[] = (result as any[]).map((row) => {
          const entity = new this.modelConstructor();
          entity.FillFromJson(row);
          return entity;
        });
        resolve(results);
      });
      window.electron.ipcRenderer.sendMessage('RequestsStreamResultLogController.LoadAllByRequestsStreamId');
    });
  }
}

let requestsStreamResultLogService = new RequestsStreamResultLogService();
export {requestsStreamResultLogService};
