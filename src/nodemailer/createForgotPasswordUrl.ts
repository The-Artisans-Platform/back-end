import { v4 } from "uuid";
import { redis } from "../redis";
import { forgotPasswordPrefix } from "./prefixes";

export const createForgotPasswordUrl = async (
  profileId: string
): Promise<string> => {
  const token = v4();
  await redis.set(forgotPasswordPrefix + token, profileId, "ex", 60 * 60 * 24); // 1 day expiration

  console.log(token);

  return `${process.env.FRONT_END_URL}protected/forgot-password/${token}`;
};
