package main

import (
	"github.com/modelcontextprotocol/go-sdk/mcp"
)

func main() {
	server := mcp.NewServer("__PROJECT_NAME__", "0.1.0")

	// Add tools here
	// server.Tool("example", func(args map[string]any) any {
	//     return args
	// })

	server.ListenStdio()
}
