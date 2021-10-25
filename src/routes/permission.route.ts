import { Router } from "express";
import { CustomeError } from "../interfaces/http-error";
import { IPermission } from "../interfaces/permission";
import { addPermission } from "../services/permission.service";
import { getRoles } from "../services/role.service";
import { generateHttpResponse } from "../utils/utils";

export const permissionRouter = Router();

permissionRouter.post("/", async (req, res) => {
  try {
    const permission: IPermission = {
      name: req.body.name,
      route: req.body.route,
      method: req.body.method,
    };
    const savedPermission = await addPermission(permission);
    return res
      .status(200)
      .json(
        generateHttpResponse(
          200,
          "Permission Saved Successfully",
          savedPermission
        )
      );
  } catch (error) {
    console.error(error);
    if (error instanceof CustomeError) {
      return res
        .status(error.code)
        .json(generateHttpResponse(error.code, error.msg, error));
    }
    return res
      .status(500)
      .json(generateHttpResponse(500, "Unkown Error", error));
  }
});
