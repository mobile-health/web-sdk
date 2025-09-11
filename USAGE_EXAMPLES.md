# Example: Using @web-sdk/shared in Your Project

This example shows how to install and use `@web-sdk/shared` in a new project.

## Quick Start

### 1. Create a New Project
```bash
mkdir my-project
cd my-project
npm init -y
# or
yarn init -y
```

### 2. Install @web-sdk/shared
```bash
# Latest version
yarn add git+https://github.com/congdcit/web-sdk.git#main:packages/shared

# Specific version
yarn add git+https://github.com/congdcit/web-sdk.git#@web-sdk/shared@0.0.4:packages/shared
```

### 3. Use in Your Code

#### TypeScript/ES Modules (Recommended)
```typescript
// main.ts
import { someFunction } from '@web-sdk/shared';
import { utilityFunction } from '@web-sdk/shared/utils';
import { SOME_CONSTANT } from '@web-sdk/shared/constants';

// Use the imported functions
console.log('Using shared utilities:', utilityFunction());
console.log('Constant value:', SOME_CONSTANT);
```

#### JavaScript (CommonJS)
```javascript
// main.js
const { someFunction } = require('@web-sdk/shared');
const { utilityFunction } = require('@web-sdk/shared/utils');

console.log('Using shared utilities:', utilityFunction());
```

### 4. Package.json Example

After installation, your `package.json` will look like:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "@web-sdk/shared": "git+https://github.com/congdcit/web-sdk.git#@web-sdk/shared@0.0.4:packages/shared"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

## Advanced Usage

### Lock to Specific Versions

For production projects, always lock to specific versions:

```json
{
  "dependencies": {
    "@web-sdk/shared": "git+https://github.com/congdcit/web-sdk.git#@web-sdk/shared@0.0.4:packages/shared"
  }
}
```

### Using in Different Environments

#### Next.js Project
```bash
npx create-next-app@latest my-next-app
cd my-next-app
yarn add git+https://github.com/congdcit/web-sdk.git#main:packages/shared
```

```tsx
// pages/index.tsx or app/page.tsx
import { utilityFunction } from '@web-sdk/shared/utils';

export default function Home() {
  return (
    <div>
      <h1>Using Web SDK: {utilityFunction()}</h1>
    </div>
  );
}
```

#### Vite Project
```bash
npm create vite@latest my-vite-app -- --template vanilla-ts
cd my-vite-app
yarn add git+https://github.com/congdcit/web-sdk.git#main:packages/shared
```

#### Node.js Project
```bash
mkdir my-node-app
cd my-node-app
npm init -y
yarn add git+https://github.com/congdcit/web-sdk.git#main:packages/shared
```

## Updating the Package

### Update to Latest Version
```bash
yarn upgrade @web-sdk/shared
```

### Update to Specific Version
```bash
yarn remove @web-sdk/shared
yarn add git+https://github.com/congdcit/web-sdk.git#@web-sdk/shared@0.0.5:packages/shared
```

## Troubleshooting

### Authentication Issues
If you get authentication errors:

```bash
# Configure Git with your GitHub credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Use GitHub CLI for authentication
gh auth login

# Or use SSH (recommended for private repos)
git config --global url."git@github.com:".insteadOf "https://github.com/"
```

### Build Issues
The package includes pre-built dist files, but if you encounter build issues:

```bash
# Clear yarn cache
yarn cache clean

# Remove node_modules and reinstall
rm -rf node_modules yarn.lock
yarn install
```

### Version Conflicts
To check what version is installed:

```bash
yarn list @web-sdk/shared
```

## Development Workflow

For teams working with this package:

1. **Install specific version** for stability
2. **Test thoroughly** before upgrading
3. **Lock versions** in package.json
4. **Document** which version your project uses

```json
{
  "dependencies": {
    "@web-sdk/shared": "git+https://github.com/congdcit/web-sdk.git#@web-sdk/shared@0.0.4:packages/shared"
  }
}
```
