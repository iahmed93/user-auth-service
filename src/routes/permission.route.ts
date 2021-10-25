import { Router } from "express";
import { HttpError } from "../interfaces/http-error";
import { IPermission } from "../interfaces/permission";
import { addPermission } from "../services/permission.service";
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
    if (error instanceof HttpError) {
      return res
        .status(error.code)
        .json(generateHttpResponse(error.code, error.msg, error));
    }
    return res
      .status(500)
      .json(generateHttpResponse(500, "Unkown Error", error));
  }
});

permissionRouter.patch("/", async (req, res) => {});

permissionRouter.get("/", async (req, res) => {});
