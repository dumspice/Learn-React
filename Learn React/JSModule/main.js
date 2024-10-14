import logger from "./logger.js";
import { TYPE_ERROR, TYPE_WARN, TYPE_LOG } from "./const.js"; //Dùng destructuring để import module.
import * as constants from "./const.js";

logger("Hello world", TYPE_WARN);

console.log(constants);
