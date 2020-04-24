import { v4 } from "uuid";
import { redis } from "../redis";
import { forgotPasswordPrefix } from "./prefixes";

export const createForgotPasswordUrl = async (
  userId: number
): Promise<string> => {
  const token = v4();
  await redis.set(forgotPasswordPrefix + token, userId, "ex", 60 * 60 * 24); // 1 day expiration

  return `${process.env.FRONT_END_URL}user/forgot-password/${token}`;
};
