import { RequestsStreamModel } from "../models/RequestsStreamModel";
import { BaseService } from "./BaseService";

class RequestsStreamService extends BaseService<RequestsStreamModel> {
  constructor() {
    super('RequestsStreamController.LoadByID', 'RequestsStreamController.LoadAll','RequestsStreamController.Delete','RequestsStreamController.Save', RequestsStreamModel);
  }
}

let requestsStreamService = new RequestsStreamService();
export {requestsStreamService};
