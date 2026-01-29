#!/usr/bin/env node

import { promptUser } from './prompts.js'
import { selectTemplate } from './templates.js'
import { renderTemplate } from './renderer.js'
import { postInstall } from './installer.js'

async function run() {
  try {
    const answers = await promptUser()
    const template = await selectTemplate(answers)
    await renderTemplate(template, answers)
    await postInstall(template, answers)
  } catch (err) {
    console.error('\n❌ create-mcp-server failed\n')
    process.exit(1)
  }
}

await run()
