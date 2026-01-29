import logging
from mcp.server import Server
from mcp.server.http import stdio_server


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create server instance
server = Server("{{projectName}}")


# Add your tools here
# @server.call_tool()
# async def example_tool(name: str, arguments: dict) -> list:
#     """Example tool implementation"""
#     return [{"type": "text", "text": f"Tool called with: {arguments}"}]


async def main():
    """Main entry point for the MCP server"""
    logger.info("Starting {{projectName}} MCP server")
    
    async with stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())