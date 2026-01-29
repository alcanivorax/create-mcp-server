package main

import (
	"log"
	"os"

	"github.com/modelcontextprotocol/go-sdk/mcp"
)

func main() {
	server := mcp.NewServer("{{projectName}}", "0.1.0")

	// Add tools here
	// server.Tool("example", "Description of what this tool does", func(args map[string]any) any {
	//     return args
	// }) Only blocker: confirm ListenStdio() returns an error.

	if err := server.ListenStdio(); err != nil {
		log.Printf("Server error: %v\n", err)
		os.Exit(1)
	}
}