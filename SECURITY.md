# Security Policy

## Supported Versions

This project is currently in active development. Security fixes are prioritized for the main development line and the dedicated security branch.

| Version/Branch    | Supported |
| ----------------- | --------- |
| `main`            | :white_check_mark: |
| `feat--security`  | :white_check_mark: |
| `feat--CI/CD`     | :x: |
| `feat-test`       | :x: |

> If you are using a tagged release, always update to the latest version available on `main`.

## Reporting a Vulnerability

If you believe you have found a security vulnerability in this repository, please report it responsibly.

Preferred reporting channels:

1. Use GitHub Private Vulnerability Reporting if enabled for this repository (Settings > Advanced security).
2. If Private Vulnerability Reporting is not available, use GitHub Security Advisories or email the repository maintainer at a dedicated security contact address.

Please include:

- A clear description of the issue.
- The affected version or branch.
- Proof-of-concept steps to reproduce.
- Expected behavior and actual behavior.

## Response Process

We will acknowledge valid reports within 48 hours and begin triage immediately. Security fixes are generally targeted for the next patch release or merged branch within 7 calendar days.

### What to expect

- Acknowledgement within 48 hours.
- A public or private fix branch created if needed.
- Coordination of disclosure timing before any public release.
- Confirmation once the issue is resolved.

## Security Guidelines

- Do not publish vulnerability details publicly before the issue is fixed.
- Do not exploit or escalate the vulnerability beyond what is necessary to demonstrate it.
- Keep communication limited to the reporting channel until the issue is resolved.

## Scope

This policy covers:

- Code in this repository.
- Build and deployment scripts relevant to the project.
- Any official documentation or configuration shipped by this repository.

Excluded from scope:

- Third-party dependencies.
- Services or infrastructure not directly managed by this repository.
- Local development environment vulnerabilities unrelated to project code.

## Disclaimer

This repository is open source and under active development. Security support is provided for the main development branch and the dedicated security branch, but users should always run the latest version and apply updates promptly.
