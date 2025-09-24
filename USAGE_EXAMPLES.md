# Installation Guide

This guide explains how to install packages from our `web-sdk` monorepo into your project. Our packages are not published to a public registry like npm. Instead, they are installed directly from our Git repository using a specific Git tag.

We will use the **`shared`** package as an example.

---

## Prerequisites

- A command-line terminal.
- Node.js and a package manager like **Yarn** or **npm** installed in your project.

---

## Installation Steps

### 1. Identify the Package Version

Each package release corresponds to a unique **Git tag** in our repository. You must know the exact version you want to install.

The tag format is the full package name followed by the version:
`@web-sdk/package-name@version`

For example, to install version `1.5.0` of the **`shared`** package, you would use the tag `@web-sdk/shared@1.5.0`.

### 2. Run the Install Command (GitHub shorthand with subpath)

We recommend using the GitHub shorthand with a subpath so the package manager installs from the `packages/shared` folder.

Pin to a specific tag (recommended for reproducibility):

```bash
yarn add @web-sdk/shared@github:mobile-health/web-sdk#@web-sdk/shared@1.5.0:packages/shared
```

Track `main` (latest on default branch):

```bash
yarn add @web-sdk/shared@github:mobile-health/web-sdk#main:packages/shared
```

Alternatively, add directly to your `package.json`:

```json
{
  "dependencies": {
    "@web-sdk/shared": "github:mobile-health/web-sdk#@web-sdk/shared@1.5.0:packages/shared"
  }
}
```

Note: The package includes a `prepare` script to build the `dist/` output during install, so you don’t need prebuilt artifacts in the repo.
