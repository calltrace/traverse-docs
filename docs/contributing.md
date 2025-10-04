# Contributing

We welcome contributions to Traverse.

## Development Setup

```bash
git clone --recursive https://github.com/calltrace/traverse.git
cd traverse
cargo build --release
cargo test --workspace
```

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Run tests (`cargo test`)
5. Run formatters (`cargo fmt && cargo clippy`)
6. Commit your changes
7. Push to your fork
8. Open a Pull Request

## Code Style

- Use `rustfmt` for formatting
- Follow `clippy` recommendations
- Add tests for new functionality
- Document public APIs
- Keep commits focused

## Testing

```bash
cargo test --workspace
cargo clippy --all-targets --all-features
cargo fmt --check
```

## Reporting Issues

Include:
- Clear description
- Reproduction steps
- Environment details
- Sample code (if applicable)

## License

By contributing, you agree that your contributions will be licensed under MIT License.