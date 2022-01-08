import { Router, Request, Response } from "express";
import logger, { modules } from "../../utils/logger";
const route = Router();

export default (app: Router): void => {
  app.use("/health", route);

  route.get("/", async (req: Request, res: Response) => {
    logger.info("Health works!", { module: modules.health, data: "healthy" });
    return res.status(200).json({ success: true, data: "healthy" });
  });
};
