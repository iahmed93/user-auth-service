import { Router } from "express";
import { CustomeError } from "../interfaces/http-error";
import { IRole } from "../interfaces/role";
import { addRole, getRoles, updateRole } from "../services/role.service";
import { generateHttpResponse } from "../utils/utils";

export const roleRouter = Router();

roleRouter.post("/", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(401).json(generateHttpResponse(401, "Missing 'name'"));
    }
    if (!req.body.permissions) {
      return res
        .status(401)
        .json(generateHttpResponse(401, "Missing 'permissions'"));
    }
    const role: IRole = {
      name: req.body.name,
      permissions: req.body.permissions,
    };
    const savedRole = await addRole(role);
    return res
      .status(200)
      .json(generateHttpResponse(200, "Success role save", savedRole));
  } catch (error) {
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

roleRouter.patch("/", async (req, res) => {
  try {
    if (!req.body._id) {
      return res.status(401).json(generateHttpResponse(401, "Missing '_id'"));
    }
    const role: IRole = {
      name: req.body.name ? req.body.name : null,
      permissions: req.body.permissions ? req.body.permissions : [],
    };
    const savedRole = await updateRole(req.body._id, role);
    return res
      .status(200)
      .json(generateHttpResponse(200, "Success role update", savedRole));
  } catch (error) {
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

roleRouter.get("/", async (req, res) => {
  try {
    const roles = await getRoles();
    return res.status(200).json(generateHttpResponse(200, "Success", roles));
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
