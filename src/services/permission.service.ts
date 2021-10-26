import { CustomeError } from "../interfaces/custome-error";
import { IPermission } from "../interfaces/permission";
import { PermissionModel } from "../models/permission.model";

export const addPermission = async (permission: IPermission) => {
  try {
    const doc = new PermissionModel(permission);
    return await doc.save();
  } catch (error) {
    console.error(error);
    throw new CustomeError(400, "Permission already exist");
  }
};

export const getPermissions = async () => {
  return await PermissionModel.find();
};
