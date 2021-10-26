import { JsonWebTokenError, sign, verify } from "jsonwebtoken";
import { CustomeError } from "../interfaces/custome-error";
import { IUser } from "../interfaces/user";
import { UserModel } from "../models/user.model";

export function generateToken(user: IUser) {
  return sign(
    {
      data: JSON.stringify({
        email: user.email,
        _id: user._id,
      }),
    },
    process.env.JWT_SECRET as string,
    { expiresIn: Number.parseInt(process.env.JWT_EXPIRES_IN as string) }
  );
}

export function verifyToken(token: string): string {
  const payload = verify(token, process.env.JWT_SECRET as string);
  return typeof payload !== "string" ? payload.data : payload;
}

export const validateTokenAndGetUser = async (
  token: string
): Promise<IUser> => {
  let payload: { email: string; _id: string } | null = null;
  try {
    payload = JSON.parse(verifyToken(token));
  } catch (error: JsonWebTokenError | any) {
    if (error.name === "TokenExpiredError") {
      const user = await UserModel.findById(payload!._id);
      if (user) {
        const tokens = user?.tokens.filter((t) => t !== token);
        user.tokens = tokens;
        await user.save();
      }
      throw new CustomeError(401, "TokenExpiredError", error);
    }
  }
  const user = await UserModel.findById(payload!._id);
  if (!user || user.email !== payload!.email) {
    throw new CustomeError(401, "User not found");
  }
  if (user.tokens.indexOf(token) === -1) {
    throw new CustomeError(401, "Invalid Token");
  }
  return user;
};
