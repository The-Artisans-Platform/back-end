import { v4 } from "uuid";
import { redis } from "../redis";
import { confirmProfilePrefix } from "./prefixes";

export const createConfirmationUrl = async (
  profileId: number
): Promise<string> => {
  const token = v4();
  await redis.set(confirmProfilePrefix + token, profileId, "ex", 60 * 60 * 24); // 1 day expiration

  console.log(token);

  return `${process.env.FRONT_END_URL}protected/confirm/${token}`;
};
