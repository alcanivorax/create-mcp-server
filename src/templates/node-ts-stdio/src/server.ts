import { McpServer } from '@modelcontextprotocol/sdk/server'

export function createServer() {
  const server = new McpServer({
    name: '__PROJECT_NAME__',
    version: '0.1.0',
  })

  return server
}
