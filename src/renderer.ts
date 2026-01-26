import fs from 'node:fs'
import path from 'node:path'
import { Answers, TemplateMeta } from './types.js'

const TEMPLATE_ROOT = new URL('./templates/', import.meta.url)

export async function renderTemplate(
  template: TemplateMeta,
  answers: Answers
): Promise<void> {
  const targetDir = path.resolve(process.cwd(), answers.projectName)

  const templateDir = path.resolve(TEMPLATE_ROOT.pathname, template.id)

  if (fs.existsSync(targetDir)) {
    throw new Error(`Directory "${answers.projectName}" already exists`)
  }

  fs.mkdirSync(targetDir, { recursive: true })

  copyDir(templateDir, targetDir, answers, template.placeholders)
}

function copyDir(
  src: string,
  dest: string,
  answers: Answers,
  placeholders: string[]
): void {
  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)

    const outName = entry.name.startsWith('_')
      ? `.${entry.name.slice(1)}`
      : entry.name

    const destPath = path.join(dest, outName)

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true })
      copyDir(srcPath, destPath, answers, placeholders)
      continue
    }

    let content = fs.readFileSync(srcPath, 'utf8')

    content = applyPlaceholders(content, answers, placeholders)

    fs.writeFileSync(destPath, content)
  }
}

function applyPlaceholders(
  content: string,
  answers: Answers,
  placeholders: string[]
): string {
  let result = content

  for (const key of placeholders) {
    const value = (answers as any)[key]

    if (!value) continue

    result = result.replaceAll(`{{${key}}}`, String(value))
  }

  return result
}
