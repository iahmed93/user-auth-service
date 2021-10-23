import express from "express";
import { connect, ConnectOptions } from "mongoose";
import { config } from "dotenv";
import morgan from "morgan";

import { userRouter } from "./routes/user.route";
import { auth } from "./middlewares/auth";

config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(morgan("combined"));
app.use("/api/user", userRouter);
app.use(auth);

const url = process.env.DB_URL as string;
const connectionOptions: ConnectOptions = {};
connect(url, connectionOptions)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running at localhost:${PORT}`);
});
