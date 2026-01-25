from mcp.server import MCPServer


def create_server() -> MCPServer:
    server = MCPServer(
        name="__PROJECT_NAME__",
        version="0.1.0",
    )

    return server
