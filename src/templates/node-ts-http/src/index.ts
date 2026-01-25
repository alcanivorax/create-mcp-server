import { createServer } from './server'
import { HttpServerTransport } from '@modelcontextprotocol/sdk/server/http'

async function main() {
  const server = createServer()

  const transport = new HttpServerTransport({
    port: 3333,
    path: '/mcp',
  })

  await server.connect(transport)
  console.log('MCP HTTP server running at http://localhost:3333/mcp')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
