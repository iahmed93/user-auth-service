import { Router } from "express";
import { HttpError } from "../interfaces/http-error";
import { IUser } from "../models/user.model";
import { signIn, signUp } from "../services/user.service";
import { generateHttpResponse } from "../utils/utils";

const userRouter = Router();

userRouter.put("/signup", async (req, res) => {
  try {
    const newUser: IUser = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      tokens: [],
    };
    await signUp(newUser);
    return res
      .status(200)
      .json(generateHttpResponse(200, "Successful Sign up"));
  } catch (error: HttpError | any) {
    console.error("/signup ERROR", { error });
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

userRouter.post("/signin", async (req, res) => {
  try {
    const token = await signIn(req.body.email, req.body.password);
    return res
      .status(200)
      .json(generateHttpResponse(200, "Successful Sign in", { token }));
  } catch (error: HttpError | any) {
    console.error("/signin ERROR", { error });
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

export { userRouter };
