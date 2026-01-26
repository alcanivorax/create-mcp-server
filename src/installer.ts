import { spawnSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'
import { Answers, TemplateMeta } from './types.js'

export async function postInstall(template: TemplateMeta, answers: Answers) {
  const projectDir = path.resolve(process.cwd(), answers.projectName)

  console.log('\n📦 Setting up your MCP server...\n')

  if (answers.git) {
    initGit(projectDir)
  }

  if (template.commands?.install) {
    runInstall(template, answers, projectDir)
  }

  printNextSteps(template, answers)
}

function initGit(dir: string) {
  if (fs.existsSync(path.join(dir, '.git'))) return

  try {
    spawnSync('git', ['init'], {
      cwd: dir,
      stdio: 'ignore',
    })
    console.log('✔ Initialized git repository')
  } catch {
    console.warn('⚠ Failed to initialize git')
  }
}

function runInstall(template: TemplateMeta, answers: Answers, dir: string) {
  let installCmd = template.commands?.install
  if (!installCmd) return

  // Replace package manager if needed (Node templates)
  if (answers.packageManager) {
    installCmd = installCmd.replace(/^pnpm|npm|yarn/, answers.packageManager)
  }

  const [cmd, ...args] = installCmd.split(' ')

  console.log(`📥 Installing dependencies (${cmd})...\n`)

  try {
    spawnSync(cmd, args, {
      cwd: dir,
      stdio: 'inherit',
    })
  } catch {
    console.warn('⚠ Dependency installation failed')
  }
}

function printNextSteps(template: TemplateMeta, answers: Answers) {
  console.log('\n✨ Done! Next steps:\n')

  console.log(`  cd ${answers.projectName}`)

  if (template.commands?.dev) {
    console.log(`  ${template.commands.dev}`)
  } else if (template.commands?.start) {
    console.log(`  ${template.commands.start}`)
  }

  console.log('\nHappy Coding! 🚀')
}
