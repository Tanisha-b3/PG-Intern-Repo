import { env } from "./configs";
import { startApp } from "./app";
import { logger } from "./logger";

startApp();

logger.info(`Server running on port ${env.PORT}`);
