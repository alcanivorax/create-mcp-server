# create-mcp-server

Scaffold a **Model Context Protocol (MCP)** server in seconds.

`create-mcp-server` is a CLI tool that helps you quickly generate a production‑ready MCP server with sensible defaults, clean project structure, and multiple language + transport options.

Whether you're experimenting locally or building a real integration, this tool gets you from **zero → running server** with minimal friction.

---

## ✨ Features

- 🚀 One‑command scaffolding
- 🌐 Multiple transports (`stdio`, `http`)
- 🧠 Multiple languages (Node.js / TypeScript, Python, more coming)
- 📁 Clean, minimal project structure
- 🧹 Preconfigured linting, formatting, and CI (where applicable)
- 🔌 Ready to plug into MCP‑compatible clients

---

## 📦 Installation

You don’t need to install anything globally. Just run:

```bash
npx create-mcp-server
```

Or, if you prefer pnpm or bun:

```bash
pnpm dlx create-mcp-server
# or
bunx create-mcp-server
```

---

## 🛠 Usage

Run the CLI and follow the prompts:

```bash
npx create-mcp-server
```

You’ll be asked to choose:

- **Project name**
- **Language** (e.g. TypeScript, Python)
- **Transport** (stdio or HTTP)
- (Optional) Package manager

Once finished, the CLI will generate a new folder with everything set up and ready to run.

---

## 📂 Generated Project Structure

The exact structure depends on the language and transport you choose, but a typical project looks like:

```txt
my-mcp-server/
├── src/
│   └── server.ts   # or server.py
├── package.json    # or pyproject.toml
├── LICENSE
├── README.md
├── tsconfig.json   # TypeScript only
├── eslint.config.js # TypeScript only
├── .gitignore
└── .github/
    └── workflows/
        └── ci.yml
```

All templates are intentionally minimal and easy to customize.

---

## 🚦 Running the Server

After scaffolding:

```bash
cd my-mcp-server
```

### Node.js / TypeScript

```bash
npm install
npm run dev
```

### Python

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python src/server.py
```

Each template includes instructions in its own generated README.

---

## 🧩 Transports

### `stdio`

- Best for local tools and CLI‑based integrations
- Communicates over standard input/output

### `http`

- Best for services and remote integrations
- Exposes an HTTP server compatible with MCP clients

---

## 🧠 What is MCP?

The **Model Context Protocol (MCP)** is a standard for tools and servers that provide structured context and capabilities to AI models.

This CLI focuses on making MCP server development:

- easy to start
- boring to maintain
- flexible to extend

---

## 🧪 Status

This project is under active development.

Expect:

- More languages
- More templates
- More configuration options

Breaking changes may happen before a stable `1.0` release.

---

## 🤝 Contributing

Contributions are welcome!

- New templates
- Bug fixes
- Docs improvements
- Ideas and feedback

Feel free to open an issue or PR.

---

## 📄 License

MIT
