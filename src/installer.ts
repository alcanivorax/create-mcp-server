import { spawnSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'
import chalk from 'chalk'
import ora from 'ora'
import { Answers, TemplateMeta } from './types.js'

export async function postInstall(template: TemplateMeta, answers: Answers) {
  const projectDir = path.resolve(process.cwd(), answers.projectName)

  console.log()
  console.log(chalk.bold.cyan('🔧 Setting up your MCP server...'))
  console.log(chalk.gray('─'.repeat(50)))
  console.log()

  if (answers.git) {
    initGit(projectDir)
  }

  printNextSteps(template, answers)
}

function initGit(dir: string) {
  if (fs.existsSync(path.join(dir, '.git'))) {
    console.log(chalk.dim('  ↳ Git repository already exists'))
    return
  }

  const spinner = ora({
    text: 'Initializing git repository',
    prefixText: chalk.cyan('  ›'),
  }).start()

  try {
    const result = spawnSync('git', ['init'], {
      cwd: dir,
      stdio: 'pipe',
    })

    if (result.status === 0) {
      spinner.succeed(chalk.green('Initialized git repository'))
    } else {
      spinner.warn(chalk.yellow('Git repository initialization skipped'))
    }
  } catch (error) {
    spinner.fail(chalk.red('Failed to initialize git'))
    console.log(chalk.dim('  ↳ Make sure git is installed'))
  }
}

function printNextSteps(template: TemplateMeta, answers: Answers) {
  console.log()
  console.log(chalk.gray('─'.repeat(50)))
  console.log(chalk.bold.green('\n✨ Project created successfully!\n'))

  console.log(chalk.bold('📋 Next steps:\n'))

  let stepNumber = 1

  // Step 1: cd into directory
  console.log(chalk.dim(`  ${stepNumber}.`) + ' Navigate to your project:')
  console.log(chalk.cyan(`     cd ${answers.projectName}`))
  console.log()
  stepNumber++

  const { install, dev, build, start } = template.commands
  const pm = answers.packageManager

  let installCommand: string | undefined
  let devCommand: string | undefined
  let buildCommand: string | undefined
  let startCommand: string | undefined

  if (template.runtime === 'node') {
    if (!pm) {
      throw new Error('Package manager is required for Node templates')
    }

    installCommand = install && resolveCommand(install, pm)
    devCommand = dev && resolveCommand(dev, pm)
    buildCommand = build && resolveCommand(build, pm)
    startCommand = start && resolveCommand(start, pm)
  } else {
    // python / go → no substitution
    installCommand = install
    devCommand = dev
    buildCommand = build
    startCommand = start
  }

  // Step 2: Install dependencies
  if (installCommand) {
    console.log(chalk.dim(`  ${stepNumber}.`) + ' Install dependencies:')
    console.log(chalk.cyan(`     ${installCommand}`))
    console.log()
    stepNumber++
  }

  // Step 3: dev/start command
  if (devCommand || startCommand) {
    console.log(
      chalk.dim(`  ${stepNumber}.`) + ' Start the development server:'
    )
    console.log(chalk.cyan(`     ${devCommand ?? startCommand}`))
    console.log()
  }

  // Additional helpful info
  console.log(chalk.dim('  💡 Useful commands:'))

  if (template.commands?.build) {
    console.log(chalk.dim(`     • Build: ${chalk.white(buildCommand)}`))
  }
  if (template.commands?.start) {
    console.log(chalk.dim(`     • Start:  ${chalk.white(startCommand)}`))
  }

  console.log()
  console.log(chalk.bold.magenta('🚀 Happy coding!'))
  console.log(chalk.dim('   Need help? Check the README.md in your project\n'))
}

function resolveCommand(cmd: string, pm: string) {
  if (!cmd.includes('{pm}')) return cmd

  if (cmd.includes(' run ') && pm !== 'npm') {
    return cmd.replace('{pm} run ', `${pm} `)
  }

  return cmd.replace('{pm}', pm)
}
