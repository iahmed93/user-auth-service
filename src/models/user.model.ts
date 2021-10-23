import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user";

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: [{ type: String }],
  role: { type: Schema.Types.ObjectId },
});

const UserModel = model<IUser>("User", schema);

export { UserModel, IUser };
