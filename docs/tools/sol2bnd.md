# sol2bnd - Binding File Generator

`sol2bnd` generates binding configuration files from Natspec annotations, mapping interfaces to their implementations. This is essential for accurate cross-contract analysis when using other Traverse tools.

## Overview

`sol2bnd` analyzes Solidity source code to:
- Extract interface definitions from Natspec comments
- Identify contract implementations of interfaces
- Generate YAML binding files for interface resolution
- Map inheritance relationships
- Create manifest files for project analysis

The generated binding files are used by other Traverse tools to accurately resolve cross-contract calls and interface relationships.

## Installation

```bash
# Install via Homebrew
brew install traverse

# Or download binary
curl -sSfL -o /usr/local/bin/sol2bnd \
  https://github.com/calltrace/traverse/releases/latest/download/sol2bnd-macos-arm64
chmod +x /usr/local/bin/sol2bnd
```

## Basic Usage

```bash
# Generate bindings for a project
sol2bnd ./contracts -o bindings.yaml

# Generate bindings for current directory
sol2bnd . -o project-bindings.yaml

# Use default output name
sol2bnd my-project/
```

## Command Line Options

### Required Arguments
- `<PROJECT_PATH>`: Path to the Solidity project directory

### Output Options
- `-o, --output-file <OUTPUT_FILE>`: Output path for the binding file (default: `binding.yaml`)

### General
- `-h, --help`: Show help information
- `-V, --version`: Show version information

## Natspec Format

`sol2bnd` recognizes standard Natspec annotations for interface identification:

### Interface Definition

```solidity
/**
 * @title IERC20
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}
```

### Implementation Binding

```solidity
/**
 * @title ERC20Token
 * @dev Implementation of the IERC20 interface
 * @custom:interface IERC20
 */
contract ERC20Token is IERC20 {
    // Implementation details
}
```

### Advanced Binding

```solidity
/**
 * @title Vault
 * @dev Implementation of multiple interfaces
 * @custom:interface IVault
 * @custom:interface IERC4626
 */
contract Vault is IVault, IERC4626 {
    // Implementation details
}
```

## Generated Binding File Structure

### Example Output

```yaml
# bindings.yaml

# Interface definitions
interfaces:
  - name: IERC20
    file: interfaces/IERC20.sol
    functions:
      - name: transfer
        signature: transfer(address,uint256)
      - name: approve
        signature: approve(address,uint256)
      - name: transferFrom
        signature: transferFrom(address,address,uint256)
      - name: balanceOf
        signature: balanceOf(address)
      - name: totalSupply
        signature: totalSupply()

  - name: IVault
    file: interfaces/IVault.sol
    functions:
      - name: deposit
        signature: deposit(uint256)
      - name: withdraw
        signature: withdraw(uint256)
      - name: getBalance
        signature: getBalance(address)

# Contract implementations
implementations:
  # ERC20 implementations
  - interface: IERC20
    contract: Token
    file: contracts/Token.sol
    functions:
      - name: transfer
        implemented: true
      - name: approve
        implemented: true
      - name: transferFrom
        implemented: true
      - name: balanceOf
        implemented: true
      - name: totalSupply
        implemented: true

  - interface: IERC20
    contract: Stablecoin
    file: contracts/Stablecoin.sol
    functions:
      - name: transfer
        implemented: true
      - name: approve
        implemented: true
      - name: transferFrom
        implemented: true
      - name: balanceOf
        implemented: true
      - name: totalSupply
        implemented: true

  # Vault implementations
  - interface: IVault
    contract: YieldVault
    file: contracts/YieldVault.sol
    functions:
      - name: deposit
        implemented: true
      - name: withdraw
        implemented: true
      - name: getBalance
        implemented: true

# Inheritance relationships
inheritance:
  - contract: YieldVault
    inherits:
      - IVault
      - IERC4626
      - Ownable

# Project metadata
metadata:
  version: "1.0.0"
  generated_at: "2025-01-15T10:30:00Z"
  total_interfaces: 2
  total_implementations: 3
```

