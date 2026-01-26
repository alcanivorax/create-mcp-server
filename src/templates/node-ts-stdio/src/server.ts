import { McpServer } from '@modelcontextprotocol/sdk/server'

export function createServer() {
  const server = new McpServer({
    name: '{{projectName}}',
    version: '0.1.0',
  })

  return server
}
