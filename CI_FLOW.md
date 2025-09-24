# CI/CD Workflow: Automated Release with Changesets

This document outlines our automated release pipeline, which is powered by the official **Changesets GitHub Action**. This single workflow handles versioning, changelog generation, and Git tagging for all packages.

---

## The Automated Release Process

The process is fully automated by a bot that runs whenever changes are merged into the `main` branch.

1.  **Developer Merges PR**: A developer merges a Pull Request into `main` that contains one or more `.changeset` files.
2.  **CI Workflow is Triggered**: This push to `main` triggers our release workflow.
3.  **Changeset Action Runs**: The workflow executes the official Changesets GitHub Action, which performs the following steps automatically:
    - It finds all new `.changeset` files that have been added.
    - It consumes these files, deleting them in the process.
    - It updates the `version` field in the `package.json` of all affected packages.
    - It updates the `CHANGELOG.md` file for all affected packages with the summaries from the changeset files.
    - It commits these version and changelog updates back to the `main` branch with a standard message like "chore: version packages".
    - Finally, it creates and pushes Git tags for all newly versioned packages (e.g., `@web-sdk/shared@1.5.0`).
