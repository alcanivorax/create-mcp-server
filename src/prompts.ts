import { input, select, confirm } from '@inquirer/prompts'
import type { Answers } from './types.js'
import chalk from 'chalk'

export async function promptUser(): Promise<Answers> {
  // Welcome banner
  console.clear()
  console.log(chalk.bold.cyan('\n🚀 MCP Server Generator\n'))
  console.log(chalk.gray('─'.repeat(50)))
  console.log(chalk.dim('Create a new Model Context Protocol server\n'))

  const projectName = await input({
    message: chalk.bold('📦 Project name:'),
    default: 'my-mcp-server',
    validate(value) {
      if (!value.trim()) return chalk.red('✗ Project name cannot be empty')
      if (value.includes(' '))
        return chalk.red('✗ Project name cannot contain spaces')
      if (!/^[a-z0-9-_]+$/i.test(value))
        return chalk.red(
          '✗ Use only letters, numbers, hyphens, and underscores'
        )
      return true
    },
    transformer(value) {
      return chalk.green(value)
    },
  })

  const language = await select<Answers['language']>({
    message: chalk.bold('🔧 Choose your language:'),
    choices: [
      {
        name: `${chalk.blue('TypeScript')}`,
        value: 'typescript',
        description: 'Recommended for most projects',
      },
      {
        name: `${chalk.yellow('Python')}`,
        value: 'python',
        description: 'Great for data processing and AI tools',
      },
      {
        name: `${chalk.cyan('Go')}`,
        value: 'go',
        description: 'Best for high-performance servers',
      },
    ],
    theme: {
      prefix: chalk.cyan('›'),
    },
  })

  const transport = await select<Answers['transport']>({
    message: chalk.bold('🌐 Select transport method:'),
    choices: [
      {
        name: `${chalk.magenta('stdio')} ${chalk.dim('- Standard input/output')}`,
        value: 'stdio',
        description: 'For CLI tools and local integrations',
      },
      {
        name: `${chalk.blue('http')} ${chalk.dim('- HTTP server')}`,
        value: 'http',
        description: 'For remote access and web services',
      },
    ],
    theme: {
      prefix: chalk.cyan('›'),
    },
  })

  let packageManager: Answers['packageManager'] = undefined

  if (language === 'typescript') {
    packageManager = await select<Answers['packageManager']>({
      message: chalk.bold('📦 Choose package manager:'),
      choices: [
        {
          name: `${chalk.yellow('pnpm')} ${chalk.dim('- Fast, disk-efficient')}`,
          value: 'pnpm',
          description: 'Recommended: saves disk space',
        },
        {
          name: `${chalk.red('npm')} ${chalk.dim('- Default Node.js manager')}`,
          value: 'npm',
          description: 'Built into Node.js',
        },
        {
          name: `${chalk.blue('yarn')} ${chalk.dim('- Feature-rich alternative')}`,
          value: 'yarn',
          description: 'Popular in many projects',
        },
      ],
      theme: {
        prefix: chalk.cyan('›'),
      },
    })
  }

  const git = await confirm({
    message: chalk.bold('🔗 Initialize a git repository?'),
    default: true,
    transformer(value) {
      return value ? chalk.green('Yes') : chalk.gray('No')
    },
    theme: {
      prefix: chalk.cyan('›'),
    },
  })

  // Summary
  console.log(chalk.dim('\n' + '─'.repeat(50)))
  console.log(chalk.bold.green('\n✓ Configuration complete!\n'))
  console.log(chalk.dim('Project setup:'))
  console.log(`  ${chalk.cyan('Name:')} ${projectName}`)
  console.log(`  ${chalk.cyan('Language:')} ${language}`)
  console.log(`  ${chalk.cyan('Transport:')} ${transport}`)
  if (packageManager) {
    console.log(`  ${chalk.cyan('Package Manager:')} ${packageManager}`)
  }
  console.log(`  ${chalk.cyan('Git:')} ${git ? 'Yes' : 'No'}`)
  console.log()

  return {
    projectName,
    language,
    transport,
    packageManager,
    git,
  }
}
