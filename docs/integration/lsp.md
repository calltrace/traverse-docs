# Language Server (LSP)

Language Server Protocol implementation for Traverse analysis engine. Works with any LSP-compatible editor.

## Features

- Multi-file workspace analysis
- Automatic Mermaid chunking for large diagrams
- Background processing
- DOT, Mermaid, and Markdown output formats

## Installation

### Download Binary

Get the latest release from [GitHub](https://github.com/calltrace/traverse-lsp/releases):

```bash
# macOS Apple Silicon
curl -sSfL -o /usr/local/bin/traverse-lsp \
  https://github.com/calltrace/traverse-lsp/releases/latest/download/traverse-lsp-darwin-arm64
chmod +x /usr/local/bin/traverse-lsp
```

Platforms:
- `linux-x64`, `linux-arm64`
- `darwin-x64`, `darwin-arm64`
- `windows-x64`

### Build from Source

```bash
git clone https://github.com/calltrace/traverse-lsp
cd traverse-lsp
cargo build --release
# Binary at target/release/traverse-lsp
```

## LSP Commands

The server implements workspace-level commands via `workspace/executeCommand`:

| Command | Description | Parameters |
|---------|-------------|------------|
| `traverse.generateCallGraph.workspace` | Generate call graph | `workspace_folder`: string |
| `traverse.generateSequenceDiagram.workspace` | Create sequence diagrams | `workspace_folder`: string<br>`no_chunk`: boolean |
| `traverse.generateAll.workspace` | Generate all diagrams | `workspace_folder`: string |
| `traverse.analyzeStorage.workspace` | Analyze storage layout | `workspace_folder`: string |

Example request:
```json
{
  "command": "traverse.generateSequenceDiagram.workspace",
  "arguments": [{
    "workspace_folder": "/path/to/project",
    "no_chunk": false
  }]
}
```

## Editor Configuration

### Helix

```toml
# ~/.config/helix/languages.toml
[[language]]
name = "solidity"
language-server = { command = "traverse-lsp" }
```

### Emacs (lsp-mode)

```elisp
(lsp-register-custom-settings
 '(("traverse-lsp.server-path" "/usr/local/bin/traverse-lsp")))

(add-to-list 'lsp-language-id-configuration '(solidity-mode . "solidity"))

(lsp-register-client
 (make-lsp-client :new-connection (lsp-stdio-connection "traverse-lsp")
                  :major-modes '(solidity-mode)
                  :server-id 'traverse-lsp))
```

### Sublime Text (LSP Package)

```json
// LSP.sublime-settings
{
  "clients": {
    "traverse-lsp": {
      "enabled": true,
      "command": ["traverse-lsp"],
      "selector": "source.solidity"
    }
  }
}
```

### Vim (vim-lsp)

```vim
" .vimrc
if executable('traverse-lsp')
  au User lsp_setup call lsp#register_server({
    \ 'name': 'traverse-lsp',
    \ 'cmd': {server_info->['traverse-lsp']},
    \ 'whitelist': ['solidity'],
    \ })
endif
```

### Kate

```json
// ~/.config/kate/lsp/server.json
{
  "servers": {
    "solidity": {
      "command": ["traverse-lsp"],
      "url": "https://github.com/calltrace/traverse-lsp",
      "highlightingModeRegex": "^Solidity$"
    }
  }
}
```

## Output Structure

All diagrams generated in workspace root:
```
project/
└── traverse-output/
    ├── call-graphs/*.dot
    ├── sequence-diagrams/
    │   ├── *.mmd
    │   └── chunks/        # Auto-chunked large diagrams
    │       ├── index.mmd
    │       ├── chunk_*.mmd
    │       └── metadata.json
    └── storage-reports/*.md
```

## Mermaid Chunking

Large sequence diagrams automatically split (400 lines/chunk by default):
- Enabled by default
- Disable with `no_chunk: true` in command arguments
- Chunks maintain proper Mermaid syntax

## Debug

```bash
# Enable debug logging
RUST_LOG=debug traverse-lsp

# Trace LSP messages
TRAVERSE_LSP_TRACE=verbose traverse-lsp
```

## Integration Requirements

Your editor needs to:
1. Run `traverse-lsp` for Solidity files
2. Use stdio for communication
3. Send workspace commands for diagram generation

[Report Issues](https://github.com/calltrace/traverse-lsp/issues)