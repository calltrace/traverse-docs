# sol2cg - Call Graph Generator

Generates call graphs and sequence diagrams from Solidity source code. Analyzes complete projects in ~500ms.

## Installation

```bash
brew install traverse
# or download binary
curl -sSfL -o /usr/local/bin/sol2cg \
  https://github.com/calltrace/traverse/releases/latest/download/sol2cg-macos-arm64
chmod +x /usr/local/bin/sol2cg
```

## Usage

```bash
sol2cg contracts/*.sol -o graph.dot
dot -Tsvg graph.dot -o graph.svg
```

## Options

### Output
- `-o, --output-file`: Output file (default: stdout)
- `-f, --format`: `dot` or `mermaid`

### Analysis
- `--exclude-isolated-nodes`: Remove orphaned nodes (DOT only)
- `--chunk-dir`: Directory for chunked Mermaid output
- `--config`: Pipeline settings (`max_depth=3,skip_internals=true`)

### Interface Resolution
- `--bindings`: Path to binding.yaml
- `--manifest-file`: Pre-generated manifest

## Output Formats

### DOT (Default)

```bash
sol2cg contracts/*.sol -o graph.dot
dot -Tpng graph.dot -o graph.png
```

Creates static diagrams for documentation.

### Mermaid

```bash
sol2cg -f mermaid contracts/*.sol -o diagram.mmd
```

Creates interactive sequence diagrams. Auto-chunks large outputs.

## Configuration

```bash
# High-level overview
sol2cg --config "max_depth=2,include_internal=false" contracts/

# Deep analysis
sol2cg --config "max_depth=15,include_modifiers=true" contracts/

# External calls only
sol2cg --config "include_internal=false,show_external_calls=true" contracts/
```

### Config Options

| Option | Default | Description |
|--------|---------|-------------|
| `max_depth` | 10 | Maximum call depth |
| `include_internal` | true | Include private/internal functions |
| `include_modifiers` | true | Include modifier calls |
| `show_external_calls` | true | Show external contract calls |

