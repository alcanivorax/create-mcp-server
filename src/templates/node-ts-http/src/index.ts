import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { HttpServerTransport } from '@modelcontextprotocol/sdk/server/http.js'

// Create server instance
const server = new Server(
  {
    name: '{{projectName}}',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

// Add tools here
// server.setRequestHandler(ListToolsRequestSchema, async () => ({
//   tools: [
//     {
//       name: 'example',
//       description: 'An example tool',
//       inputSchema: {
//         type: 'object',
//         properties: {
//           input: { type: 'string' },
//         },
//       },
//     },
//   ],
// }))

async function main() {
  const port = Number(process.env.PORT) || 3000

  const transport = new HttpServerTransport({
    port,
  })

  await server.connect(transport)

  console.log(
    `{{projectName}} MCP server listening on http://localhost:${port}`
  )
}

main().catch((error) => {
  console.error('Server error:', error)
  process.exit(1)
})
