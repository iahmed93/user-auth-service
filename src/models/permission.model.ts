import { model, Schema } from "mongoose";
import { IPermission } from "../interfaces/permission";

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  route: { type: String, required: true },
  method: { type: String, required: true },
});

export const PermissionModel = model<IPermission>("Permission", schema);
