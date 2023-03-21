const { execCommand, spawn, getVersion } = require("./util");

/**
 * 供命令行调用的 任务执行器
 */
const cliExecutor = (res) => {
  const { chore } = res;
  if (chore) {
    executorChoreRelease();
  }
};

/**
 * npm version
 * @chore default patch
 */
const executorChoreRelease = async (chore) => {
  // 升级版本号
  await execCommand(`npm version ${chore || "patch"} --git-tag-version false`);

  // 生成CHANELOG.md
  await execCommand("npx conventional-changelog -p angular -i CHANGELOG.md -s");

  // 将所有变更加入暂存区
  await execCommand("git add --all");

  await spawn("git commit -m", [`chore(release): ${getVersion()}`]);

  await execCommand(`git tag v${getVersion()}`);

  // 推送到远程仓库，包括tag
  await execCommand("git push origin --tag");
};

module.exports = {
  cliExecutor,
};
