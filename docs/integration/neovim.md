# Neovim Plugin

Zero-configuration workspace-level analysis for Solidity projects. Neovim 0.11+ only.

## Install

### Lazy.nvim

**Quick Install:**
```lua
{ "calltrace/traverse-lsp.nvim" }
```

**With Keybindings:**
```lua
{
  "calltrace/traverse-lsp.nvim",
  ft = "solidity",
  keys = {
    { "<leader>tg", "<cmd>TraverseCallGraph<cr>", desc = "Call Graph" },
    { "<leader>ts", "<cmd>TraverseSequenceDiagram<cr>", desc = "Sequence Diagram" },
    { "<leader>ta", "<cmd>TraverseAnalyzeStorage<cr>", desc = "Storage Analysis" },
    { "<leader>tt", "<cmd>TraverseGenerateAll<cr>", desc = "Generate All" },
  },
}
```

**Advanced Setup:**
```lua
{
  "calltrace/traverse-lsp.nvim",
  ft = "solidity",
  build = ":TraverseUpdate",
  opts = {
    auto_start = true,     -- Auto-start server
    auto_install = true,   -- Auto-download binary
    no_chunk = false,      -- Enable Mermaid chunking
  },
}
```

### Packer.nvim
```lua
use {
  "calltrace/traverse-lsp.nvim",
  run = ":TraverseInstall",
  config = function()
    require("traverse-lsp").setup()
  end,
}
```

## Quick Start

```vim
:TraverseCallGraph        " Generate call graph
:TraverseSequenceDiagram  " Generate sequence diagram
:TraverseAnalyzeStorage   " Analyze storage
:TraverseGenerateAll      " Generate all diagrams
```

The plugin automatically downloads the binary and starts the LSP server. Output in `traverse-output/`.

## Commands

### Binary Management
- `:TraverseInstall` - Download binary
- `:TraverseUpdate` - Update to latest
- `:TraverseUninstall` - Remove binary

### Server Control
- `:TraverseStart [dir]` - Start server
- `:TraverseStop` - Stop server
- `:TraverseStatus` - Check status

### Analysis
- `:TraverseCallGraph` - Generate DOT graph
- `:TraverseSequenceDiagram` - Generate Mermaid diagram
- `:TraverseAnalyzeStorage` - Analyze storage layout
- `:TraverseGenerateAll` - Generate all diagrams

## Output Structure

```
project/
└── traverse-output/
    ├── call-graphs/*.dot
    ├── sequence-diagrams/*.mmd
    │   └── chunks/           # For large diagrams
    │       ├── index.mmd
    │       ├── chunk_*.mmd
    │       └── metadata.json
    └── storage-reports/*.md
```

## Viewing Diagrams

### DOT Files
```bash
dot -Tpng traverse-output/call-graphs/*.dot -o graph.png
```

### Mermaid Files
```bash
# Install mermaid-cli
npm install -g @mermaid-js/mermaid-cli

# Convert to PNG
mmdc -i traverse-output/sequence-diagrams/*.mmd -o diagram.png

# Process chunks
for chunk in traverse-output/sequence-diagrams/chunks/chunk_*.mmd; do
  mmdc -i "$chunk" -o "${chunk%.mmd}.png"
done
```

## Configuration

```lua
require("traverse-lsp").setup({
  auto_install = true,   -- Auto-download binary
  auto_start = false,    -- Don't auto-start
  no_chunk = true,       -- Disable chunking
  cmd = { "/custom/path/to/traverse-lsp" },  -- Custom binary
})
```

