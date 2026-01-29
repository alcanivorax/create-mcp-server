import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/http.js'

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
//       name: "example",
//       description: "An example tool",
//       inputSchema: {
//         type: "object",
//         properties: {
//           input: { type: "string" }
//         }
//       }
//     }
//   ]
// }));

// Main function
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('{{projectName}} MCP server running on stdio')
}

main().catch((error) => {
  console.error('Server error:', error)
  process.exit(1)
})
