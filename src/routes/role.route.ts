import { Router } from "express";
import { HttpError } from "../interfaces/http-error";
import { IRole } from "../interfaces/role";
import { addRole } from "../services/role.service";
import { generateHttpResponse } from "../utils/utils";

export const roleRouter = Router();

roleRouter.post("/", async (req, res) => {
    try {
        if(!req.body.name){
            return res
                .status(401)
                .json(generateHttpResponse(401, "Missing 'name'"));
        }
        if(!req.body.permissions){
            return res
                .status(401)
                .json(generateHttpResponse(401, "Missing 'permissions'"));
        }
        const role: IRole = {name: req.body.name, permissions: req.body.permissions};
        const savedRole = await addRole(role);
        return res.status(200)
            .json(generateHttpResponse(200, "Authorized", savedRole));
    } catch (error) {
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

roleRouter.patch("/", async (req, res) => {});

roleRouter.get("/", async (req, res) => {});
