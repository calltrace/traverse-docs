# Building from Source

Build Traverse tools from source for development, customization, or to get the latest features before they're released.

## Prerequisites

### System Requirements

- **Operating System**: Linux, macOS, or Windows (with WSL2)
- **Memory**: Minimum 4GB RAM (8GB recommended)
- **Disk Space**: 2GB for build artifacts
- **Network**: Internet connection for dependencies

### Required Software

**Rust Toolchain** (version 1.83 or later):
```bash
# Install Rust (recommended method)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# Verify installation
rustc --version
cargo --version

# Ensure we're using the right version
rustup update
rustup default stable
```

**Git** (for cloning with submodules):
```bash
# Install Git (if not already installed)
# Ubuntu/Debian:
sudo apt-get update && sudo apt-get install git

# macOS (with Homebrew):
brew install git

# Verify Git
git --version
```

**Optional Dependencies**:
- **Graphviz** (for visualizing DOT graphs)
  ```bash
  # Ubuntu/Debian:
  sudo apt-get install graphviz

  # macOS:
  brew install graphviz

  # Verify:
  dot -V
  ```

- **Foundry** (for test generation)
  ```bash
  curl -L https://foundry.paradigm.xyz | bash
  foundryup
  ```

## Clone Repository

### Clone with Submodules

Traverse uses Git submodules for tree-sitter grammars. Clone recursively:

```bash
# Clone the repository with submodules
git clone --recursive https://github.com/calltrace/traverse.git

# Or if you already cloned:
cd traverse
git submodule update --init --recursive
```

### Verify Repository Structure

```bash
cd traverse

# Check that submodules are initialized
ls -la lib/tree-sitter-solidity/
ls -la lib/tree-sitter-comment/

# Verify the workspace structure
cat Cargo.toml | head -20
```

Expected structure:
```
traverse/
├── Cargo.toml          # Workspace configuration
├── crates/
│   ├── cli/            # Command-line interface
│   ├── graph/          # Call graph generation
│   ├── solidity/       # Solidity parsing
│   ├── mermaid/        # Mermaid diagram generation
│   ├── codegen/        # Test generation
│   └── logging/        # Logging utilities
├── lib/
│   └── tree-sitter-*/   # Tree-sitter grammars
├── examples/
├── tests/
└── README.md
```

## Build Instructions

### Standard Build

```bash
# Build all tools in release mode (optimized)
cargo build --release

# Build specific tool only
cargo build --release --bin sol2cg
cargo build --release --bin sol2test
cargo build --release --bin sol-storage-analyzer
cargo build --release --bin storage-trace
cargo build --release --bin sol2bnd

# Build in debug mode (faster compile, larger binaries)
cargo build
```

### Build Output

After successful build, binaries are located in:

- **Release builds**: `target/release/`
  - `sol2cg`
  - `sol2test`
  - `sol-storage-analyzer`
  - `storage-trace`
  - `sol2bnd`

- **Debug builds**: `target/debug/` (larger, with debug symbols)

### Install to System Path

```bash
# Install all tools
cargo install --path crates/cli

# Or install specific tools
cargo install --path crates/cli --bin sol2cg
cargo install --path crates/cli --bin sol2test
```

## Development Build

### Debug Build with Features

```bash
# Build with debug information
cargo build

# Build with specific features
cargo build --features dev

# Build with verbose output
cargo build --verbose
```

### Run Tests

```bash
# Run all tests
cargo test --workspace

# Run tests for specific package
cargo test -p traverse-graph
cargo test -p traverse-solidity

# Run tests with output
cargo test -- --nocapture

# Run specific test
cargo test test_call_graph_generation
```

### Code Formatting and Linting

```bash
# Format code
cargo fmt

# Check formatting
cargo fmt --check

# Run clippy lints
cargo clippy --all-targets --all-features

# Fix clippy suggestions (where possible)
cargo clippy --fix
```

## Build Optimization

### Maximum Performance Build

Create `.cargo/config.toml` in the repository root:

```toml
[build]
rustflags = ["-C", "target-cpu=native"]

[profile.release]
lto = true
codegen-units = 1
strip = true
opt-level = 3
panic = "abort"
```

Then build:
```bash
cargo build --release
```

### Minimum Size Build

Add to `.cargo/config.toml`:
```toml
[profile.release]
opt-level = "z"
lto = true
codegen-units = 1
strip = true
panic = "abort"
```

## Cross-Compilation

### Cross-Compile for Different Targets

```bash
# Install target for cross-compilation
rustup target add x86_64-unknown-linux-musl
rustup target add aarch64-apple-darwin
rustup target add x86_64-pc-windows-gnu

# Cross-compile
cargo build --release --target x86_64-unknown-linux-musl
cargo build --release --target aarch64-apple-darwin
cargo build --release --target x86_64-pc-windows-gnu
```

### Docker Cross-Compilation

Create `Docker.build`:
```dockerfile
FROM rust:1.83 as builder

WORKDIR /app
COPY . .

RUN cargo build --release

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/target/release/sol* /usr/local/bin/
```

Build:
```bash
docker build -t traverse:latest -f Docker.build .
```


## Development Workflow

### Development Commands

```bash
# Watch for changes and rebuild
cargo watch -x 'build --release'

# Run specific tool tests during development
cargo test -p cli --bin sol2test

# Build and test in one command
cargo test && cargo build --release

# Check code quality
cargo fmt && cargo clippy && cargo test
```

### Making Changes

1. **Modify source code** in `crates/` directory
2. **Run tests**: `cargo test --workspace`
3. **Build**: `cargo build --release`
4. **Test changes**: `./target/release/sol2cg contracts/`
5. **Format and lint**: `cargo fmt && cargo clippy`
6. **Commit changes**: `git add . && git commit -m "Your changes"`

### Workspace Management

```bash
# List workspace members
cargo metadata --format-version 1 | jq -r '.workspace_members[]'

# Build specific package
cargo build -p traverse-graph

# Test specific package
cargo test -p traverse-solidity

# Install specific package
cargo install --path crates/cli -p traverse-cli
```

## Release Process

### Pre-release Checklist

```bash
# 1. Update version in Cargo.toml
# 2. Update CHANGELOG.md
# 3. Run full test suite
cargo test --workspace

# 4. Run clippy
cargo clippy --all-targets --all-features

# 5. Check formatting
cargo fmt --check

# 6. Build release
cargo build --release

# 7. Test release binaries
./target/release/sol2cg --version
./target/release/sol2test --version
```

### Building Release Artifacts

```bash
# Create release directory
mkdir release

# Build release binaries
cargo build --release

# Copy release binaries
cp target/release/sol* release/

# Create archives
cd release
tar -czf traverse-linux-x86_64.tar.gz sol*
zip traverse-windows-x86_64.zip sol*
```

## Environment Variables

### Build-time Variables

```bash
# Set optimization level
export RUSTFLAGS="-C opt-level=3"

# Set target CPU
export RUSTFLAGS="-C target-cpu=native"

# Enable debug info
export RUSTFLAGS="-g"

# Strip symbols
export RUSTFLAGS="-C link-arg=-s"
```

### Runtime Variables

```bash
# Set log level
export RUST_LOG=info

# Enable debug logging
export RUST_LOG=debug

# Specific module logging
export RUST_LOG=sol2cg=debug,traverse=info

# Disable color output
export NO_COLOR=1
```

## IDE Setup

### VSCode

Install extensions:
- Rust Analyzer
- Better TOML
- Error Lens

Workspace configuration (`.vscode/settings.json`):
```json
{
    "rust-analyzer.checkOnSave.command": "clippy",
    "rust-analyzer.cargo.features": "all",
    "rust-analyzer.cargo.loadOutDirsFromCheck": true
}
```

### Neovim

Configuration (`~/.config/nvim/init.lua`):
```lua
require('lspconfig').rust_analyzer.setup({
    settings = {
        ['rust-analyzer'] = {
            cargo = {
                features = "all",
            },
            checkOnSave = {
                command = "clippy",
            },
        },
    },
})
```

## Next Steps

After building from source:

1. **Test your build**: `./target/release/sol2cg --version`
2. **Run examples**: Check the `examples/` directory
3. **Read documentation**: Available at `/docs/`
4. **Contribute**: See `CONTRIBUTING.md` for guidelines

Building from source gives you access to the latest features and allows you to customize Traverse for your specific needs.