#!/usr/bin/env node

async function run() {
  const answers = await promptUser()
  const template = await selectTemplate(answers)
  await renderTemplate(template, answers)
  await postInstall(template, answers)
}
