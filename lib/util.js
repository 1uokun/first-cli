const cp = require("child_process");
const fs = require("fs");
const chalk = require("chalk");

/**
 * 获取值的原始类型
 *
 * @param {any} val
 * @param {*} type
 */
const checkOriginType = (val, type) => {
  const originType = Object.prototype.toString.call(val).slice(8, -1);
  const output = originType === "Number" && isNaN(val) ? "NaN" : originType;

  return type ? output === type : output;
};
/**
 * 是否是对象
 *
 * @param {any} val
 */
const isObj = (val) => checkOriginType(val, "Object");

/**
 * 输出自定义颜色 log 至终端
 *
 * @param {*} msg 文本 - 对象会被 JSON.stringify 强转为 String
 * @param {*} color 颜色
 */
const log = (msg, color) =>
  console.log(chalk[color](isObj(msg) ? JSON.stringify(msg) : msg));

log.success = (msg = "success!\n") => log(msg, "green");
log.error = (msg = "error!\n") => log(msg, "red");
log.warn = (msg = "warn!\n") => log(msg, "yellow");
log.info = (msg = "info!\n") => log(msg, "gray");

/**
 * 异步执行 spawn 命令， 用法类似 exec，主要用于实时输出 log
 * @param {*} cmd 命令或命令+参数 以空格分割
 * @param {*} args 参数或配置
 * @param {*} options 配置
 *
 * @example
 * spawn('git reset --hard')
 * spawn('git reset --hard', { cwd: precess.cwd() })
 * spawn('git reset', ['--hard'])
 * spawn('git', ['reset', '--hard'], { cwd: precess.cwd() })
 */
const spawn = (cmd, args, options) =>
  new Promise((resolve, reject) => {
    let finalArgs = args;
    let finalOptions = options;
    const [command, ...commandArgs] = cmd.split(" ");

    if (checkOriginType(finalArgs, "Array")) {
      finalArgs = commandArgs.concat(finalArgs);
    } else if (isObj(finalArgs)) {
      finalOptions = finalArgs;
      finalArgs = commandArgs;
    }

    const run = cp.spawn(command, finalArgs, finalOptions);
    let message = "";

    run.stdout.on("data", log.info);
    run.stderr.on("data", (data) => {
      message += data;
    });
    run.on("close", (code) => {
      if (code !== 0) {
        reject(Error(`code: ${code}, message: ${message}`));
      } else {
        resolve();
      }
    });
  });

/**
 * 获取版本号
 */
const getVersion = () => {
  return JSON.parse(fs.readFileSync(process.cwd() + "/package.json", "utf8"))
    .version;
};

/**
 * 标准执行命令
 * @param {*} command
 * @param {*} cwd
 */
const execCommand = async (command, cwd) => {
  await spawn(command, { cwd });
};

module.exports = {
  execCommand,
  spawn,
  getVersion,
};
