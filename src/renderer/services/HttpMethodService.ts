import { stat } from "fs";
import { HttpMethodModel } from "../models/HttpMethodModel";
import { BaseService } from "./BaseService";

class HttpMethodService extends BaseService<HttpMethodModel> {

  constructor() {
    super('HttpMethodController.LoadByID', 'HttpMethodController.LoadAll','HttpMethodController.Delete','HttpMethodController.Save', HttpMethodModel);
  }
}

let httpMethodService = new HttpMethodService();
export {httpMethodService};

