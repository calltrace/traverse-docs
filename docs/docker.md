# Docker

Run Traverse tools without installation using Docker containers.

## Using Pre-built Images

```bash
# Pull all-in-one image
docker pull ghcr.io/calltrace/traverse:all

# Pull specific tool
docker pull ghcr.io/calltrace/traverse:sol2cg
```

## Running Tools

```bash
# Run sol2cg
docker run --rm -v $(pwd):/workspace \
  ghcr.io/calltrace/traverse:sol2cg /workspace/contracts/*.sol

# Use all-in-one image with different tools
docker run --rm -v $(pwd):/workspace --entrypoint sol2test \
  ghcr.io/calltrace/traverse:all /workspace/contracts/*.sol -o /workspace/tests
```

## Building from Source

```bash
git clone --recursive https://github.com/calltrace/traverse.git
cd traverse

# Build specific tool
docker build --target sol2cg -t traverse:sol2cg .

# Build all tools in one image
docker build --target all -t traverse:all .
```

## Docker Compose

```yaml
# docker-compose.yml
version: '3.8'
services:
  sol2cg:
    image: ghcr.io/calltrace/traverse:sol2cg
    volumes:
      - ./contracts:/workspace
      - ./output:/output
    command: ["/workspace", "-o", "/output/callgraph.dot"]
```

Run with:
```bash
docker-compose up
```