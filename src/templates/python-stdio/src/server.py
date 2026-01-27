from mcp.server import MCPServer


def create_server() -> MCPServer:
    server = MCPServer(
        name="{{projectName}}",
        version="0.1.0",
    )

    return server
