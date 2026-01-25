from mcp.transport.http import HttpTransport
from server import create_server


def main() -> None:
    server = create_server()
    transport = HttpTransport(
        host="127.0.0.1",
        port=3333,
        path="/mcp",
    )
    server.connect(transport)
    print("MCP HTTP server running at http://localhost:3333/mcp")


if __name__ == "__main__":
    main()
