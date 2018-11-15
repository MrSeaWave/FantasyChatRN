import debug from "debug";

// const otherDebug = require("debug")("workerChat");
// export const startLog = otherDebug.extend("start");
// 上下两者相同表示
export const startLog = debug("workerChat:start");
export const infoLog = debug("workerChat:info");
export const errorLog = debug("workerChat:error");
errorLog.color = debug.colors[5];
infoLog.color = debug.colors[2];
