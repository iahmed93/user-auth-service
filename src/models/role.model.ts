import { model, Schema } from "mongoose";
import { IRole } from "../interfaces/role";

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: String }],
});

export const RoleModel = model<IRole>("Role", schema);
