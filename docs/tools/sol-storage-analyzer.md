# sol-storage-analyzer - Storage Access Analyzer

`sol-storage-analyzer` maps storage read and write patterns for all public and external functions in Solidity contracts. It helps identify state modification patterns, optimization opportunities, and potential security vulnerabilities related to storage access.

## Overview

`sol-storage-analyzer` analyzes Solidity source code to identify:
- Storage variables read by each function
- Storage variables written by each function
- State modification patterns
- Gas-intensive storage operations
- Potential optimization opportunities

The tool outputs detailed reports in markdown format, making it easy to identify storage-heavy functions and optimization targets.

## Installation

```bash
# Install via Homebrew
brew install traverse

# Or download binary
curl -sSfL -o /usr/local/bin/sol-storage-analyzer \
  https://github.com/calltrace/traverse/releases/latest/download/sol-storage-analyzer-macos-arm64
chmod +x /usr/local/bin/sol-storage-analyzer
```

## Basic Usage

```bash
# Analyze single contract
sol-storage-analyzer Token.sol

# Analyze multiple contracts
sol-storage-analyzer contracts/Token.sol contracts/Vault.sol

# Process entire directory
sol-storage-analyzer src/

# Save analysis to file
sol-storage-analyzer contracts/ -o storage-report.md
```

## Command Line Options

### Required Arguments
- `<INPUT_PATHS>...`: One or more Solidity files or directories to analyze

### Output Options
- `-o, --output-file <OUTPUT_FILE>`: Output file for the analysis report (default: stdout)

### Interface Resolution
- `--bindings <BINDINGS>`: Path to binding.yaml file for interface resolution
- `--manifest-file <MANIFEST_FILE>`: Path to pre-generated manifest.yaml

### General
- `-h, --help`: Show help information
- `-V, --version`: Show version information

## Output Format

The tool generates a markdown report with detailed storage access information:

### Basic Report Structure

```markdown
# Storage Access Analysis Report

## Summary
- **Total Contracts**: 3
- **Total Storage Variables**: 15
- **Functions with Storage Writes**: 8
- **Functions with Storage Reads Only**: 12

## Detailed Analysis

### ERC20 Token

| Function | Storage Reads | Storage Writes | Gas Estimate |
|----------|---------------|----------------|--------------|
| `transfer(address,uint256)` | `balances[from]`, `balances[to]` | `balances[from]`, `balances[to]` | ~50,000 |
| `balanceOf(address)` | `balances[account]` | - | ~2,000 |
| `approve(address,uint256)` | `allowances[owner][spender]` | `allowances[owner][spender]` | ~45,000 |
| `transferFrom(address,address,uint256)` | `balances[from]`, `balances[to]`, `allowances[owner][spender]` | `balances[from]`, `balances[to]`, `allowances[owner][spender]` | ~65,000 |

### Vault Contract

| Function | Storage Reads | Storage Writes | Gas Estimate |
|----------|---------------|----------------|--------------|
| `deposit(uint256)` | `balances[user]`, `totalDeposits` | `balances[user]`, `totalDeposits` | ~55,000 |
| `withdraw(uint256)` | `balances[user]`, `totalDeposits` | `balances[user]`, `totalDeposits` | ~60,000 |
| `getBalance(address)` | `balances[user]` | - | ~2,000 |

## Storage Variables
- `balances`: mapping(address => uint256)
- `allowances`: mapping(address => mapping(address => uint256))
- `totalSupply`: uint256
- `totalDeposits`: uint256

