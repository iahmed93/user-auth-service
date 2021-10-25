import { CustomeError } from "../interfaces/http-error";
import { IRole } from "../interfaces/role";
import { IUser } from "../interfaces/user";
import { RoleModel } from "../models/role.model";

export const addRole = async (role: IRole): Promise<IRole> => {
  // check if role's permissions are valid
  const permissions = await RoleModel.find({ name: { $in: role.permissions } });
  if (permissions.length === role.permissions.length) {
    throw new CustomeError(401, "Please use valid permissions");
  }
  // save
  try {
    const doc = new RoleModel(role);
    return await doc.save();
  } catch (error) {
    console.log(error);
    throw new CustomeError(500, "Failed to save to DB");
  }
};

export const getRoles = async (): Promise<IRole[]> => {
  return await RoleModel.find({});
};

export const updateRole = async (id: string, role: IRole): Promise<IRole> => {
  const oldRole = await RoleModel.findById(id);
  if (!oldRole) {
    throw new CustomeError(400, "Role is not found");
  }
  let newPermissions: string[] = [];
  if (role.permissions && role.permissions.length > 0) {
    newPermissions = role.permissions.filter(
      (perm) => oldRole.permissions.indexOf(perm) === -1
    );
    if (newPermissions && newPermissions.length) {
      const permissions = await RoleModel.find({
        name: { $in: role.permissions },
      });
      if (permissions.length === newPermissions.length) {
        throw new CustomeError(401, "Please use valid permissions");
      }
      oldRole.permissions.push(...newPermissions);
    }
  }
  if (role.name) {
    oldRole.name = role.name;
  }
  const savedRole = await oldRole.save();
  return savedRole;
};

export const getRoleByName = async (name: string): Promise<IRole | null> => {
  const role = await RoleModel.findOne({ name });
  console.log({ role });
  return role ? role : null;
};
