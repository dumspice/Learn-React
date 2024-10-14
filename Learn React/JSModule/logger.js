import { TYPE_LOG, TYPE_ERROR, TYPE_WARN } from "./const.js";

function logger(log, type = TYPE_LOG) {
  console[type](log);
}
export default logger;
