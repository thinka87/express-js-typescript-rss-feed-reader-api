import { Router, Request, Response } from "express";
import RSSService from "../../services/RSSService";
import { SuccessResponse, ErrorResponse } from "../../utils/responseHandler";
const route = Router();

export default (app: Router): void => {
  app.use("/rss", route);

  route.get("/feed", async (req: Request, res: Response) => {
    try {
      const data = await RSSService.feedByURL(req.query.q as string);
      return SuccessResponse(res, data, null, 200);
    } catch (e) {
      //@todo - Log error
      return ErrorResponse(res, { message: "Error in fetching URL" }, 400);
    }
  });
  route.get("/tag", async (req: Request, res: Response) => {
    try {
      const data = await RSSService.getTagInfo(req.query.q as string);
      return SuccessResponse(res, data, null, 200);
    } catch (e) {
      //@todo - Log error
      return ErrorResponse(res, { message: "Error accessing Tag info" }, 400);
    }
  });
};
