# VS Code Extension

![Traverse Demo](https://raw.githubusercontent.com/calltrace/traverse-vscode/main/media/traverse-demo.gif)

Solidity smart contract visualization with automatic call graph and sequence diagram generation.

## Install

### From Marketplace
Install from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GianlucaBrigandi.traverse-vscode) or search "Traverse Solidity Analyzer" in Extensions.

### From VSIX
```bash
code --install-extension traverse-vscode-0.1.6.vsix
```

## First Run

The extension downloads the LSP server binary on first activation. Supported platforms:
- macOS (Intel & Apple Silicon)
- Linux (x64 & ARM64)
- Windows (x64)

Manual download: Command Palette → `Traverse: Download Language Server`

## Usage

1. Open a Solidity project
2. Right-click any folder → Select "Traverse" commands
3. Results saved to `traverse-output/` in project root

**Commands** (Cmd+Shift+P):
- `Generate Call Graph` - DOT format function relationships
- `Generate Sequence Diagram` - Mermaid execution flow
- `Generate Storage Analysis` - Storage variable access patterns
- `Generate All Analyses` - Run all analyses
- `Toggle Chunking` - Enable/disable output chunking for large projects

## Configuration

VS Code settings:
- `traverse-lsp.enableChunking` - Chunk large outputs (default: false)
- `traverse-lsp.serverPath` - Custom LSP server path
- `traverse-lsp.trace.server` - Enable debug tracing

## Limitations (Preview)

- Limited Solidity 0.8+ feature support
- Performance issues with >100 contracts
- Cross-file references experimental

