import { compareSync, hashSync } from "bcrypt";
import { HttpResponse } from "../interfaces/http-resp";

export function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function hashedText(password: string, saltRounds: number): string {
  return hashSync(password, saltRounds);
}

export function compareHash(plainText: string, hashedText: string): boolean {
  return compareSync(plainText, hashedText);
}

export function generateHttpResponse(
  code: number,
  msg: string,
  payload: any = null
): HttpResponse {
  return {
    code,
    msg,
    payload,
  };
}
