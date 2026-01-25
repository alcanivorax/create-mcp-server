import { createServer } from './server'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio'

async function main() {
  const server = createServer()
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
