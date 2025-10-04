# Installation

## Homebrew (Recommended)

```bash
brew tap calltrace/tap
brew install traverse
```

Installs all tools: `sol2cg`, `sol2test`, `sol-storage-analyzer`, `storage-trace`, `sol2bnd`.

## Download Binaries

```bash
# macOS Apple Silicon
curl -sSfL -o /usr/local/bin/sol2cg \
  https://github.com/calltrace/traverse/releases/latest/download/sol2cg-macos-arm64
chmod +x /usr/local/bin/sol2cg
```

Platforms:
- `macos-amd64` (Intel)
- `macos-arm64` (Apple Silicon)
- `linux-amd64`
- `windows-amd64.exe`

## Docker

```bash
docker pull ghcr.io/calltrace/traverse:all
docker run --rm -v $(pwd):/workspace \
  ghcr.io/calltrace/traverse:sol2cg /workspace/contracts/*.sol
```

## Build from Source

```bash
git clone --recursive https://github.com/calltrace/traverse.git
cd traverse
cargo build --release
```

Binaries in `target/release/`

## Verify Installation

```bash
sol2cg --version
```

## Requirements

- **Graphviz** (optional): For converting DOT files to images
  ```bash
  brew install graphviz  # macOS
  apt install graphviz    # Ubuntu
  ```

- **Foundry** (optional): For sol2test validation
  ```bash
  curl -L https://foundry.paradigm.xyz | bash
  foundryup
  ```

## Next Steps

- [Quick Start](/quick-start) - First analysis
- [Tool Documentation](/tools/sol2cg) - Detailed guides