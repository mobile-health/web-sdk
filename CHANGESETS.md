# Introduction to Changesets

Changesets is a tool designed to manage versioning and changelogs for codebases with multiple packages, often called **monorepos**. It provides a clear and scalable workflow for documenting changes, bumping package versions, and generating release notes.

Think of it like a logbook for a ship. As developers add new cargo (features and fixes), they each make a quick entry in the logbook describing what they added. When the ship is ready to leave port (a new release), the captain (a release manager or CI bot) reviews the logbook, finalizes the cargo manifest (`CHANGELOG.md`), and officially names the voyage (the version number).

---

## Why Use Changesets?

For any project with more than one package or more than one developer, Changesets solves several common problems.

* **Automated Versioning**: It eliminates the guesswork of which version number to use. Developers simply state the *significance* of their change (**patch**, **minor**, or **major**), and Changesets automatically calculates the correct next version for each package.

* **Automatic Changelogs**: It uses the summaries provided by developers to generate clean, professional `CHANGELOG.md` files for every release. This ensures changes are always well-documented.

* **Handles Monorepo Dependencies**: If you have a `ui` package that depends on a `shared` package, Changesets automatically updates the `ui` package to use the new version of `shared` when it's released.

* **Improves Collaboration**: It separates the act of writing code from the act of releasing. Multiple developers can contribute changes, and the tool bundles all their work into a single, cohesive release, often through a "Version Packages" pull request that can be reviewed by the team.

---

## The Core Workflow

The Changesets process can be broken down into three main stages.

### 1. Adding a Changeset

After a developer finishes their code changes, they run a command to add a "changeset." This is a small markdown file that documents their work. The command prompts them for:
* **Which packages** were affected.
* The **severity** of the change for each package (`patch`, `minor`, `major`).
* A **summary** of the change for the changelog.

This small file is then committed along with the source code.

### 2. Versioning the Packages

When it's time to prepare a release, a command is run (usually by a CI bot) that "consumes" all the pending changeset files. This command:
* Bumps the version numbers in the `package.json` files of the affected packages.
* Updates the `CHANGELOG.md` files with the summaries.
* Deletes the changeset files it just used.

This process typically results in a commit and a pull request named **"Version Packages"**.

### 3. Publishing the Release

Once the "Version Packages" pull request is merged, a final command is run to publish the packages to a registry (like npm) or, for private use, to create and push Git tags for each newly released package.

In short, Changesets brings consistency, automation, and clarity to the release process, making it an essential tool for modern monorepo development. ✨