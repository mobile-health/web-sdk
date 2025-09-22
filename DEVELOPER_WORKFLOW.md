# Developer Guide: Contributing a Change with Changesets

This guide outlines the process for contributing code to the `web-sdk` repository. We use **Changesets** to manage versioning and generate changelogs automatically.

Your new responsibility is to create a "changeset" file that declares the *intent* of your change. **You should no longer manually edit the `version` field in `package.json` files.**

---

## The Contribution Workflow

Follow these steps when you're ready to submit your work.

### 1. Make Code Changes

As usual, implement your features, fix bugs, and write tests in the relevant package's source directory (e.g., `packages/shared/src`).

### 2. Create a Changeset

After you've finished your code changes, invoke the Changesets command-line tool to add a new changeset.

Run this command at the root of the repository:
```bash
yarn changeset
```

This will launch an interactive prompt that guides you through the process:

1.  **Select Packages**: Choose the package(s) you've modified.
2.  **Define Severity**: For each selected package, specify if the change requires a `major`, `minor`, or `patch` version bump based on **Semantic Versioning**.
3.  **Write a Summary**: Write a clear summary of your change. This text will be used to automatically generate the package's `CHANGELOG.md` file.

After you finish, a new markdown file will be created in the `.changeset` directory. This file captures the "intent" of your change.

### 3. Finalize Your Contribution

With your code and changeset ready, the final step is to commit and push your work.

First, stage your changes for a commit. Be sure to include both your source code modifications and the new markdown file in the `.changeset` directory.

Next, commit the staged files with a message that clearly describes your work. You no longer need to mention version numbers in the message.

Finally, push your commit to the remote repository to prepare it for a pull request. Once your changes are merged into `main`, the CI pipeline will handle all the versioning and tagging. ✅

```bash
# Add all your changes, including the new .changeset file
git add .
git commit -m "feat(shared): add new date utility functions"
git push origin your-feature-branch
```

---

## Quick Checklist ✅

-   [ ] Code changes are complete and tested.
-   [ ] A changeset file has been generated to describe the changes.
-   [ ] The new `.changeset/*.md` file is staged along with source code.
-   [ ] A descriptive commit has been created.
-   [ ] The commit has been pushed to the remote repository.