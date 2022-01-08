import { Router } from "express";
import rssRoutes from "./routes/rss";
import health from "./routes/health";

// guaranteed to get dependencies
export default () => {
  const app = Router();
  health(app);
  rssRoutes(app);

  return app;
};
