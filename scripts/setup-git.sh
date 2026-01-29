#!/bin/bash

# Matcha Gallery - Git Setup Script
# Initializes git repository and sets up for GitHub Pages deployment

echo "🍵 Setting up Git for Matcha Gallery..."
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Get user information
read -p "Enter your GitHub username: " GITHUB_USER
read -p "Enter your Git email: " GIT_EMAIL

# Configure git
git config --global user.name "$GITHUB_USER"
git config --global user.email "$GIT_EMAIL"

echo ""
echo "✅ Git configured:"
echo "   Username: $(git config --global user.name)"
echo "   Email: $(git config --global user.email)"
echo ""

# Initialize repository if not already initialized
if [ ! -d .git ]; then
    echo "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Matcha cafe gallery"
    git branch -M main
    echo ""
    echo "✅ Repository initialized"
else
    echo "⚠️  Git repository already exists"
fi

echo ""
read -p "Enter your GitHub repository name (e.g., matcha-gallery): " REPO_NAME

if [ -n "$REPO_NAME" ]; then
    REPO_URL="https://github.com/$GITHUB_USER/$REPO_NAME.git"
    
    # Check if remote already exists
    if git remote get-url origin &> /dev/null; then
        echo "⚠️  Remote 'origin' already exists. Updating..."
        git remote set-url origin "$REPO_URL"
    else
        git remote add origin "$REPO_URL"
    fi
    
    echo ""
    echo "✅ Remote repository configured: $REPO_URL"
    echo ""
    echo "📤 Ready to push! Run:"
    echo "   git push -u origin main"
fi

echo ""
echo "🎉 Setup complete!"
