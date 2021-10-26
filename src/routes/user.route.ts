import { Router } from "express";
import { CustomeError } from "../interfaces/custome-error";
import { IUser } from "../interfaces/user";
import { signIn, signUp, validateUser } from "../services/user.service";
import { generateHttpResponse } from "../utils/utils";

export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const newUser: IUser = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      tokens: [],
    };
    const savedUser = await signUp(newUser);
    return res
      .status(200)
      .json(generateHttpResponse(200, "Successful Sign up", savedUser));
  } catch (error: CustomeError | any) {
    console.error("/signup ERROR", { error });
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

userRouter.patch("/signin", async (req, res) => {
  try {
    const token = await signIn(req.body.email, req.body.password);
    return res
      .status(200)
      .json(generateHttpResponse(200, "Successful Sign in", { token }));
  } catch (error: CustomeError | any) {
    console.error("/signin ERROR", { error });
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

userRouter.post("/validate", async (req, res) => {
  try {
    if (!req.body.authToken) {
      return res
        .status(401)
        .json(generateHttpResponse(401, "Missing 'authToken'"));
    }
    if (!req.body.permission) {
      return res
        .status(401)
        .json(generateHttpResponse(401, "Missing 'permission'"));
    }
    const user = await validateUser(req.body.authToken, req.body.permission);
    return user
      ? res.status(200).json(generateHttpResponse(200, "Authorized", user))
      : res.status(200).json(generateHttpResponse(401, "Unauthorized"));
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
