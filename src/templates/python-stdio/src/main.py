from mcp.transport.stdio import StdioTransport
from server import create_server


def main() -> None:
    server = create_server()
    transport = StdioTransport()
    server.connect(transport)


if __name__ == "__main__":
    main()
