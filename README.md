# Traverse Documentation

Documentation for Traverse - Solidity analysis tools.

## Quick Start

```bash
brew tap calltrace/tap && brew install traverse
sol2cg contracts/*.sol -o graph.dot
dot -Tsvg graph.dot -o graph.svg
```

## Documentation

- [Installation](/installation)
- [Tools](/tools/sol2cg)
- [VSCode Extension](/integration/vscode)
- [Examples](/examples/smart-invoice)

## Tools

- **sol2cg**: Generate call graphs (DOT/Mermaid)
- **sol2test**: Generate Foundry tests
- **sol-storage-analyzer**: Map storage reads/writes
- **storage-trace**: Compare function storage access
- **sol2bnd**: Generate interface bindings

Performance: ~500ms for 17 contracts, 580 functions (Apple M3)

## Links

- [GitHub](https://github.com/calltrace/traverse)
- [Releases](https://github.com/calltrace/traverse/releases)
- [Issues](https://github.com/calltrace/traverse/issues)

MIT License