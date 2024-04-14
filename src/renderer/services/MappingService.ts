import { MappingModel } from "../models/MappingModel";
import { BaseService } from "./BaseService";

class MappingService extends BaseService<MappingModel> {
  constructor() {
    super('MappingController.LoadByID', 'MappingController.LoadAll','MappingController.Delete','MappingController.Save', MappingModel);
  }

  LoadAllByRequestsStreamItemId(id: number): Promise<MappingModel[]> {
    return new Promise((resolve, reject) => {
      window.electron.ipcRenderer.once('MappingController.LoadAllByRequestsStreamItemId', (result : any) => {
        const results: MappingModel[] = (result as any[]).map((row) => {
          const entity = new this.modelConstructor();
          entity.FillFromJson(row);
          return entity;
        });
        resolve(results);
      });
      window.electron.ipcRenderer.sendMessage('MappingController.LoadAllByRequestsStreamItemId', id);
    });
  }
}

let mappingService = new MappingService();
export {mappingService};
