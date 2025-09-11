# Installing @web-sdk/shared

This package is distributed as a private GitHub package. Here are the different ways to install it:

## Method 1: Standard Package Manager Installation (Recommended)

### Install with npm/yarn/pnpm
```bash
# With yarn (recommended)
yarn add git+https://github.com/congdcit/web-sdk.git#main:packages/shared

# With npm
npm install git+https://github.com/congdcit/web-sdk.git#main:packages/shared

# With pnpm
pnpm add git+https://github.com/congdcit/web-sdk.git#main:packages/shared
```

### Install Specific Version
```bash
# Install specific tag version with yarn
yarn add git+https://github.com/congdcit/web-sdk.git#@web-sdk/shared@0.0.4:packages/shared

# Install specific tag version with npm
npm install git+https://github.com/congdcit/web-sdk.git#@web-sdk/shared@0.0.4:packages/shared
```

### Install from Specific Branch
```bash
# Install from a specific branch
yarn add git+https://github.com/congdcit/web-sdk.git#feature-branch:packages/shared

# Install from develop branch
yarn add git+https://github.com/congdcit/web-sdk.git#develop:packages/shared
```

## Method 2: Using Package.json Dependencies

Add to your `package.json`:

```json
{
  "dependencies": {
    "@web-sdk/shared": "git+https://github.com/congdcit/web-sdk.git#main:packages/shared"
  }
}
```

Or for a specific version:

```json
{
  "dependencies": {
    "@web-sdk/shared": "git+https://github.com/congdcit/web-sdk.git#@web-sdk/shared@0.0.4:packages/shared"
  }
}
```

Then run:
```bash
yarn install
# or
npm install
```

### Authentication for Private Repository
If the repository is private, you'll need authentication:

```bash
# Using GitHub Personal Access Token
npm install git+https://<token>@github.com/congdcit/web-sdk.git#main:packages/shared

# Or configure git credentials
git config --global url."https://<token>@github.com/".insteadOf "https://github.com/"
```

## Method 2: Download Release Assets

1. Visit: https://github.com/congdcit/web-sdk/releases
2. Find the desired release (e.g., `@web-sdk/shared@0.0.4`)
3. Download `web-sdk-shared-X.X.X-dist.tar.gz`
4. Extract the tarball:
   ```bash
   tar -xzf web-sdk-shared-0.0.4-dist.tar.gz
   ```
5. Copy the `dist` folder to your project

## Method 3: Using in Your Project

Once installed, you can import the package:

```javascript
// ES Modules
import { someFunction } from '@web-sdk/shared';
import { utilityFunction } from '@web-sdk/shared/utils';
import { SOME_CONSTANT } from '@web-sdk/shared/constants';

// CommonJS (if supported)
const { someFunction } = require('@web-sdk/shared');
```

## TypeScript Support

The package includes TypeScript definitions in the `dist` folder:
- Main types: `./dist/index.d.ts`
- Utils types: `./dist/utils/index.d.ts`
- Constants types: `./dist/constants/index.d.ts`

## Package Structure

The package exports the following entry points:
- Main: `@web-sdk/shared` → `./dist/index.js`
- Utils: `@web-sdk/shared/utils` → `./dist/utils/index.js`
- Constants: `@web-sdk/shared/constants` → `./dist/constants/index.js`

## Version Information

- Current Version: 0.0.4
- Repository: https://github.com/congdcit/web-sdk
- Package Path: `packages/shared`

## Authentication for Private Access

For private repositories, team members will need:

1. **GitHub Access**: Permission to access the repository
2. **Git Authentication**: Either:
   - SSH keys configured with GitHub
   - Personal Access Token with repo permissions
   - GitHub CLI authentication (`gh auth login`)

## Troubleshooting

### Common Issues:

1. **Authentication Error**:
   ```bash
   # Solution: Set up authentication
   gh auth login
   # Or use token in URL
   npm install git+https://<token>@github.com/congdcit/web-sdk.git#main:packages/shared
   ```

2. **Package Not Found**:
   - Ensure you have access to the repository
   - Check the package path is correct: `packages/shared`
   - Verify the tag/branch exists

3. **Build Issues**:
   - The package includes pre-built `dist` folder
   - No additional build steps required after installation
