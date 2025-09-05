# Changesets for Private GitHub Repository

This project uses [Changesets](https://github.com/changesets/changesets) to manage versioning and create GitHub tags and releases for this private repository.

## How it works

1. When you make changes that should trigger a version bump, you create a changeset
2. Changesets will track these changes and generate version bumps when merged to main
3. GitHub Actions will automatically create git tags and GitHub releases for new versions
4. Packages remain private - no publishing to npm registries

## Creating a changeset

When you make changes that should be released:

```bash
yarn changeset
```

This will:
- Ask you which packages have changed
- Ask you what type of change (patch, minor, major)
- Ask you to write a summary of the changes
- Create a changeset file in `.changeset/`

## Release process

1. Make your changes and create a changeset: `yarn changeset`
2. Commit the changeset file along with your changes
3. Push to a branch and create a PR
4. When the PR is merged to main:
   - GitHub Actions will create a "Version Packages" PR if there are pending changesets
   - When you merge that PR, it will:
     - Update package.json versions
     - Update CHANGELOG.md files
     - Create git tags for the new versions
     - Create GitHub releases
     - Commit the version changes

## Available commands

- `yarn changeset` - Create a new changeset
- `yarn changeset:version` - Update package versions based on changesets (usually done by CI)
- `yarn changeset:publish` - Not used (packages are private)
- `yarn changeset:tag` - Create git tags (handled automatically by CI)

## Configuration

The configuration is in `.changeset/config.json`:
- `changelog`: Uses git changelog format for GitHub integration
- `commit`: true - automatically commits version changes
- `access`: "restricted" - packages are marked as private
- `baseBranch`: "main" - the main branch for releases

## Private Repository Benefits

Since this is a private repository:
- Packages are kept private (no accidental npm publishing)
- GitHub releases provide a clean way to track versions
- Internal teams can reference specific versions via git tags
- Version history is maintained within the repository
