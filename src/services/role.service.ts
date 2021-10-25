import { HttpError } from "../interfaces/http-error";
import { IRole } from "../interfaces/role";
import { RoleModel } from "../models/role.model";

export const addRole = async (role: IRole) => {
  // check if role's permissions are valid
  const permissions = await RoleModel.find({name: {$in: role.permissions}});
  if (permissions.length === role.permissions.length) {
    throw new HttpError(401, 'Please use valid permissions');
  }
  // save
  try {
    const doc = new RoleModel(role);
    return await doc.save();
  } catch (error) {
    console.log(error);
    throw new HttpError(500, "Failed to save to DB");
  }
};
