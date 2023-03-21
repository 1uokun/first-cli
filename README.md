# 创建你的第一个命令行工具 🔧

## 使用

```sh
npm link first-cli
```

命令行调用

```sh
Usage: my-first-cli [options]

我的第一个npm cli

Options:
  -v --version              output the version number
  -c, --commander           支持命令简写
  -d, --desc <message>      "<>"符号表示<后面参数必跟>
  --option [optionRequire]  "[]"符号表示[参数可选]
  -h, --help                display help for command
  --chore [version]         根据npm version自动升级版本号并生成CHANGELOG和tag
```

## 案例：根据 npm version 自动升级版本号并生成 CHANGELOG 和 tag

```sh
# 默认npm version patch 2.0.0 -> 2.0.1
my-first-cli --chore

# 2.0.1 -> 2.1.0
my-first-cli --chore minor
```

commit

```
[master 1032855] chore(release): 2.0.1
 3 files changed, 6 insertions(+), 2 deletions(-)
 create mode 100644 CHANGELOG.md

commit 1032855b1cf595074073dca82dd12f6ddee8e2fe (HEAD -> master, tag: v2.0.1)
Author: xx <xx@xx.xx>
Date:   Mon Mar 20 20:50:08 2023 +0800

    chore(release): 2.0.1

```

## 详细教程

### 项目文件夹结构

- `/bin`cli 命令总集
  <br/>入口文件必须以 `#!/usr/bin/env node` 开头

  ```js
  #!/usr/bin/env node

  ...
  ```

- `/lib` 各个命令动作的具体代码
- `package.json`

### package.json 字段属性

- `bin`
  <br/> https://docs.npmjs.com/cli/v9/configuring-npm/package-json#bin
  <br/> 告诉 npm 可执行的命令
  ```json
   "bin": {
     "my-first-cli": "./bin/first-cli.js"
   },
  ```

### 引用三方库

- [1] [commander.js](https://github.com/tj/commander.js) 完整的 node.js 命令行解决方案
- [2] [chalk](https://github.com/chalk/chalk) 命令行字体样式美化
- [3] [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) 自动生成 CHANGELOG.md
