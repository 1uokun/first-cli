#!/usr/bin/env node

const program = require("commander");
const { cliExecutor } = require("../lib");

program
  .version(require("../package").version, "-v --version")
  .usage("[options]");

program
  .description("我的第一个npm cli")
  .option("-c, --commander", '","命令可简写')
  .option("-d, --desc <message>", '"<>"符号表示<后面参数必跟>')
  .option("--option [option]", '"[]"符号表示[参数可选]')
  .option(
    "--chore [version]",
    "根据npm version自动升级版本号并生成CHANGELOG和tag"
  )
  .action((res) => cliExecutor(res));

program.parse(process.argv);
