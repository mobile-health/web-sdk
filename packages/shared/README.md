# @web-sdk/shared

A shared utility package built with Vite.js for the mobile health web SDK monorepo.

## Features

- **Utilities**: Common utility functions for formatting, debouncing, throttling, and more
- **Types**: Shared TypeScript interfaces and types
- **Constants**: Application-wide constants and configuration values
- **Built with Vite**: Fast build and development experience
- **TypeScript**: Full type safety and IntelliSense support

## Installation

This package is part of the monorepo and is automatically linked via workspace dependencies.

```json
{
  "dependencies": {
    "@web-sdk/shared": "*"
  }
}
```

## Usage

```typescript
import { formatDate, debounce, User, API_ENDPOINTS } from '@web-sdk/shared'

// Use utility functions
const formattedDate = formatDate(new Date())
const debouncedFn = debounce(() => console.log('Hello'), 300)

// Use types
const user: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date(),
  updatedAt: new Date()
}

// Use constants
const endpoint = API_ENDPOINTS.USERS
```

## Development

```bash
# Build the package
yarn build

# Watch mode for development
yarn dev

# Type checking
yarn check-types

# Linting
yarn lint
```

## Exports

- `utils`: Common utility functions
- `types`: TypeScript interfaces and types
- `constants`: Application constants and configuration
