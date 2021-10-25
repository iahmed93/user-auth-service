import { HttpError } from "../interfaces/http-error";
import { IUser } from "../interfaces/user";
import { UserModel } from "../models/user.model";
import { compareHash, hashedText, validateEmail } from "../utils/utils";
import {
  generateToken,
  validateTokenAndGetUser,
  verifyToken,
} from "./token.service";

export const signUp = async (user: IUser): Promise<IUser> => {
  // Email and Password are required check
  if (!user.password) {
    throw new HttpError(400, "Password is required");
  }
  if (!user.email) {
    throw new HttpError(400, "Email is required");
  }
  // validate email format
  if (!validateEmail(user.email)) {
    throw new HttpError(400, "Invalid email format");
  }
  // check if user already exist
  const oldUser = await UserModel.findOne({ email: user.email });
  if (oldUser) {
    throw new HttpError(400, "Email already exist");
  }
  // hash password
  user.password = hashedText(user.password, 10);
  // save user
  try {
    const doc = new UserModel(user);
    return await doc.save();
  } catch (error) {
    console.log(error);
    throw new HttpError(500, "Failed to save to DB");
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<string> => {
  // Email and Password are required check
  if (!password) {
    throw new HttpError(400, "Password is required");
  }
  if (!email) {
    throw new HttpError(400, "Email is required");
  }
  // get user by email
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new HttpError(401, "Invalid Email or Password");
  }
  // validate password
  if (!compareHash(password, user.password)) {
    throw new HttpError(401, "Invalid Email or Password");
  }
  // generate token
  const token = generateToken(user);
  verifyToken(token);
  user.tokens.push(token);
  console.log(user);
  user.save();
  // return user data with the token
  return token;
};

/**
 * Check if user has valid token
 * Remove the toke from user's tokens if the token expired
 * Check if user has valid permissions
 */
export const validateUser = async (
  token: string,
  permission: string
): Promise<IUser> => {
  return await validateTokenAndGetUser(token);
};
