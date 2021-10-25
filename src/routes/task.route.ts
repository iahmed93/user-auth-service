import { Router } from "express";
import { auth } from "../middlewares/auth";
import { generateHttpResponse } from "../utils/utils";

const taskRouter = Router();

taskRouter.use(auth);
taskRouter.use((req, res, next) => {
  console.log("METHOD:", req.method);
  console.log("URL:", req.url);
  console.log("Route:", req.route);
  console.log("BaseURL:", req.baseUrl);
  let isAuthorized = false;
  switch (req.method) {
    case "POST":
      console.log("AddTask Permission", req.body.user);
      isAuthorized = true;
      break;
    case "GET":
      console.log("GetAllTasks Permission");
      isAuthorized = true;
      break;
    case "PATCH":
      console.log("UpdateTask Permission");
      isAuthorized = true;
      break;
    case "DELETE":
      console.log("DeleteTask Permission");
      isAuthorized = true;
      break;
    default:
      console.log("Not Handled Method");
      isAuthorized = false;
  }
  return isAuthorized
    ? next()
    : res.status(401).json(generateHttpResponse(401, "Not Authorized"));
});
taskRouter.post("/", async (req, res) => {
  return res.status(200).json(generateHttpResponse(200, "Post Success"));
});

taskRouter.patch("/:id", async (req, res) => {
  return res.status(200).json(generateHttpResponse(200, "Patch Success"));
});

taskRouter.delete("/:id", async (req, res) => {
  return res.status(200).json(generateHttpResponse(200, "Delete Success"));
});

taskRouter.get("/", async (req, res) => {
  return res.status(200).json(generateHttpResponse(200, "Get Success"));
});

export { taskRouter };
