import { Document } from "mongoose";
import { IPermission } from "../interfaces/permission";
import { PermissionModel } from "../models/permission.model";
import { RoleModel } from "../models/role.model";
import { addRole, updateRole } from "./role.service";

describe("role", () => {
  describe("addRole", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    test("should return error 'Please use valid permissions' when any of the permissions are not found", async () => {
      const role = {
        name: "admin",
        permissions: ["AddTask", "Anything"],
      };
      const permissions = [
        {
          name: "AddTask",
          route: "/api/task/",
          method: "POST",
          _id: "617700187b70bc3381a542b4",
        },
      ];

      PermissionModel.find = jest.fn().mockResolvedValue(permissions);

      try {
        await addRole(role);
      } catch (error: any) {
        expect(error.msg).toBe("Please use valid permissions");
      }
    });

    test("should call save once to save the new role", async () => {
      const role = {
        name: "admin",
        permissions: ["AddTask"],
      };
      const permissions = [
        {
          name: "AddTask",
          route: "/api/task/",
          method: "POST",
          _id: "617700187b70bc3381a542b4",
        },
      ];

      PermissionModel.find = jest.fn().mockResolvedValue(permissions);

      // const doc = new RoleModel(role);
      const saveSpy = jest.spyOn(RoleModel.prototype, "save");

      await addRole(role);

      expect(saveSpy).toHaveBeenCalled();
    });
  });

  describe("updateRole", () => {
    test("should return error 'Role is not found' when the role to be updated in not found", async () => {
      const role = {
        name: "admin",
        permissions: ["AddTask"],
      };
      const id = "1234";

      RoleModel.findById = jest.fn().mockResolvedValue(null);

      try {
        await updateRole(id, role);
      } catch (error: any) {
        expect(error.msg).toBe("Role is not found");
      }
    });

    test("should return error 'Please use valid permissions' when any of the permissions are not found", async () => {
      const role = {
        name: "admin",
        permissions: ["AddTask", "Anything"],
      };
      const permissions: IPermission[] = [];
      const id = "1234";

      RoleModel.findById = jest.fn().mockResolvedValue({
        name: "admin",
        permissions: ["AddTask"],
      });

      PermissionModel.find = jest.fn().mockResolvedValue(permissions);
      try {
        await updateRole(id, role);
      } catch (error: any) {
        expect(error.msg).toBe("Please use valid permissions");
      }
    });

    test("should call save to save the role to db", async () => {
      const role = {
        name: "admin",
        permissions: ["AddTask", "GetTask"],
      };

      const permissions = [
        {
          name: "GetTask",
          route: "/api/task/",
          method: "POST",
          _id: "617700187b70bc3381a542b4",
        },
      ];
      const id = "1234";

      RoleModel.findById = jest.fn().mockResolvedValue({
        name: "admin",
        permissions: ["AddTask"],
      });

      PermissionModel.find = jest.fn().mockResolvedValue(permissions);

      const saveSpy = jest.spyOn(Document.prototype, "save");

      await updateRole(id, role);

      expect(saveSpy).toHaveBeenCalled();
    });
  });
});
