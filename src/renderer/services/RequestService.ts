import { RequestModel } from "../models/RequestModel";
import { BaseService } from "./BaseService";

class RequestService extends BaseService<RequestModel> {
  constructor() {
    super('RequestController.LoadByID', 'RequestController.LoadAll','RequestController.Delete','RequestController.Save', RequestModel);
  }
}

let requestService = new RequestService();
export {requestService};
