import expressLoader from "./express";
import Logger from "../utils/logger";

export default async ({ expressApp }): Promise<void> => {
  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
