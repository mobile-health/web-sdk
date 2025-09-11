#!/bin/bash
# install-web-sdk.sh - Script to download and install @web-sdk/shared

set -e

# Configuration
REPO="congdcit/web-sdk"
PACKAGE_NAME="@web-sdk/shared"
DEFAULT_VERSION="latest"
INSTALL_DIR="./node_modules/@web-sdk"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to get the latest release version
get_latest_version() {
    print_status "Fetching latest release information..."
    
    # Try to get latest release info from GitHub API
    if command -v curl >/dev/null 2>&1; then
        latest_tag=$(curl -s "https://api.github.com/repos/$REPO/releases" | \
                    grep -o '"tag_name": *"[^"]*"' | \
                    grep "$PACKAGE_NAME" | \
                    head -1 | \
                    cut -d'"' -f4)
    elif command -v wget >/dev/null 2>&1; then
        latest_tag=$(wget -qO- "https://api.github.com/repos/$REPO/releases" | \
                    grep -o '"tag_name": *"[^"]*"' | \
                    grep "$PACKAGE_NAME" | \
                    head -1 | \
                    cut -d'"' -f4)
    else
        print_error "Neither curl nor wget found. Please install one of them."
        exit 1
    fi
    
    if [ -z "$latest_tag" ]; then
        print_error "Could not find latest release for $PACKAGE_NAME"
        exit 1
    fi
    
    echo "$latest_tag"
}

# Function to download and extract release asset
install_package() {
    local version=${1:-$(get_latest_version)}
    local package_version=$(echo "$version" | sed "s/${PACKAGE_NAME}@//")
    local asset_name="web-sdk-shared-${package_version}-dist.tar.gz"
    local download_url="https://github.com/$REPO/releases/download/$version/$asset_name"
    
    print_status "Installing $PACKAGE_NAME version $package_version..."
    
    # Create install directory
    mkdir -p "$INSTALL_DIR/shared"
    
    # Download the asset
    print_status "Downloading $asset_name..."
    if command -v curl >/dev/null 2>&1; then
        curl -L -o "/tmp/$asset_name" "$download_url"
    elif command -v wget >/dev/null 2>&1; then
        wget -O "/tmp/$asset_name" "$download_url"
    else
        print_error "Neither curl nor wget found"
        exit 1
    fi
    
    # Extract to install directory
    print_status "Extracting to $INSTALL_DIR/shared..."
    tar -xzf "/tmp/$asset_name" -C "$INSTALL_DIR/shared"
    
    # Clean up
    rm "/tmp/$asset_name"
    
    # Create package.json for the installed package
    cat > "$INSTALL_DIR/shared/package.json" << EOF
{
  "name": "$PACKAGE_NAME",
  "version": "$package_version",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./utils": {
      "import": "./dist/utils/index.js",
      "types": "./dist/utils/index.d.ts"
    },
    "./constants": {
      "import": "./dist/constants/index.js",
      "types": "./dist/constants/index.d.ts"
    }
  }
}
EOF
    
    print_status "Successfully installed $PACKAGE_NAME@$package_version"
    print_status "Package location: $INSTALL_DIR/shared"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [VERSION]"
    echo ""
    echo "Install @web-sdk/shared package from GitHub releases"
    echo ""
    echo "Arguments:"
    echo "  VERSION    Specific version to install (e.g., @web-sdk/shared@0.0.4)"
    echo "             If not provided, latest version will be installed"
    echo ""
    echo "Examples:"
    echo "  $0                                    # Install latest version"
    echo "  $0 @web-sdk/shared@0.0.4            # Install specific version"
    echo ""
}

# Main script logic
main() {
    if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
        show_usage
        exit 0
    fi
    
    # Check if we're in a Node.js project
    if [ ! -f "package.json" ]; then
        print_warning "No package.json found. Are you in a Node.js project directory?"
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 0
        fi
    fi
    
    # Install the package
    install_package "$1"
    
    echo ""
    print_status "Installation complete! You can now import the package:"
    echo "  import { ... } from '@web-sdk/shared';"
    echo "  import { ... } from '@web-sdk/shared/utils';"
    echo "  import { ... } from '@web-sdk/shared/constants';"
}

# Run the script
main "$@"
