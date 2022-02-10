import { CustomeError } from "../interfaces/custome-error";
import { IUser } from "../interfaces/user";
import { UserModel } from "../models/user.model";
import { compareHash, hashedText, validateEmail } from "../utils/utils";
import { getRoleByName } from "./role.service";
import {
  generateToken,
  validateTokenAndGetUser,
  verifyToken,
} from "./token.service";

export const signUp = async (user: IUser): Promise<IUser> => {
  // Email and Password are required check
  if (!user.password) {
    throw new CustomeError(400, "Password is required");
  }
  if (!user.email) {
    throw new CustomeError(400, "Email is required");
  }
  // validate email format
  if (!validateEmail(user.email)) {
    throw new CustomeError(400, "Invalid email format");
  }
  // check if user already exist
  const oldUser = await UserModel.findOne({ email: user.email });
  if (oldUser) {
    throw new CustomeError(400, "Email already exist");
  }
  // hash password
  user.password = hashedText(user.password, 10);
  // save user
  try {
    const doc = new UserModel(user);
    return await doc.save();
  } catch (error) {
    console.log(error);
    throw new CustomeError(500, "Failed to save to DB");
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<string> => {
  // Email and Password are required check
  if (!password) {
    throw new CustomeError(400, "Password is required");
  }
  if (!email) {
    throw new CustomeError(400, "Email is required");
  }
  // get user by email
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new CustomeError(401, "Invalid Email or Password");
  }
  // validate password
  if (!compareHash(password, user.password)) {
    throw new CustomeError(401, "Invalid Email or Password");
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
): Promise<IUser | null> => {
  const user = await validateTokenAndGetUser(token);
  const hasPermission = await hasValidPermission(user, permission);
  return hasPermission ? user : null;
};

export const hasValidPermission = async (
  user: IUser,
  permission: string
): Promise<boolean> => {
  const role = await getRoleByName(user.role);
  console.log(role);
  return role && role.permissions.indexOf(permission) > -1 ? true : false;
};
