# Quick Start

Get Traverse running in minutes.

## Prerequisites

- Traverse installed ([Installation Guide](/installation))
- Solidity files to analyze
- Graphviz for visualizations (optional)

## First Analysis

### 1. Test Contract

```solidity
// Token.sol
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;
    uint256 public totalSupply;

    constructor(uint256 _supply) {
        totalSupply = _supply;
        balances[msg.sender] = _supply;
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        require(balances[msg.sender] >= amount);
        balances[msg.sender] -= amount;
        balances[to] += amount;
        return true;
    }
}
```

### 2. Generate Call Graph

```bash
sol2cg Token.sol -o graph.dot
dot -Tsvg graph.dot -o graph.svg
```

### 3. Generate Tests

```bash
sol2test Token.sol -o test/
```

Creates `test/Token.t.sol` with setUp and test stubs.

### 4. Analyze Storage

```bash
sol-storage-analyzer Token.sol
```

Output:
```
| Endpoint | Reads | Writes |
|----------|-------|--------|
| Token.transfer | balances | balances |
| Token.constructor | | totalSupply, balances |
```

## Multi-Contract Project

```bash
# Analyze entire project
sol2cg contracts/*.sol -o project.dot

# Exclude orphaned functions
sol2cg --exclude-isolated-nodes contracts/*.sol -o clean.dot

# Mermaid with auto-chunking
sol2cg -f mermaid contracts/*.sol --chunk-dir chunks/

# Generate all tests
sol2test --project . --use-foundry

# Complete storage analysis
sol-storage-analyzer contracts/*.sol -o storage.md
```

## Common Workflows

### Security Audit
```bash
sol2cg contracts/*.sol -o audit.dot
sol-storage-analyzer contracts/*.sol -o storage.md
sol2test contracts/*.sol --validate-compilation
```

### Upgrade Validation
```bash
storage-trace --func1 TokenV1.transfer --func2 TokenV2.transfer contracts/
```

### Documentation
```bash
sol2cg -f mermaid contracts/*.sol -o docs/architecture.mmd
```

## Next Steps

- [Tool Documentation](/tools/sol2cg)
- [VSCode Integration](/integration/vscode)