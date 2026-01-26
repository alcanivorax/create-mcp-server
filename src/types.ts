export type Answers = {
  projectName: string
  language: 'typescript' | 'python' | 'go'
  transport: 'stdio' | 'http'
  packageManager?: 'pnpm' | 'npm' | 'yarn'
  git: boolean
}

export type TemplateMeta = {
  id: string
  display: string

  language: 'typescript' | 'python' | 'go'
  runtime: string
  transport: 'stdio' | 'http'

  supports: {
    exampleTool: boolean
  }

  commands?: {
    install?: string
    dev?: string
    build?: string
    start?: string
  }

  placeholders: string[]
}
