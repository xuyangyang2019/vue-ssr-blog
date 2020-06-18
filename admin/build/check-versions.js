'use strict'
// node终端样式库
const chalk = require('chalk')
// 版本和版本范围的解析、计算、比较
const semver = require('semver')
// 模块重新包装了 child_process，调用系统命令更加方便
const shell = require('shelljs')
// 配置文件
const packageConfig = require('../package.json')

function exec(cmd) {
  // child_process是nodejs的一个子进程模块，可以用来创建一个子进程，并执行一些任务
  return require('child_process').execSync(cmd).toString().trim()
}

// node的当前版本和所需版本
const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  }
]

// npm的当前版本和所需版本
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []
  // node npm 版本对比
  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }
  // warn 日志
  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
