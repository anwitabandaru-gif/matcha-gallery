#!/bin/bash

# Matcha Gallery - Deploy Script
# Quick deploy to GitHub (commits and pushes changes)

echo "🍵 Deploying Matcha Gallery..."
echo ""

# Check if git is configured
if ! git config --global user.name &> /dev/null; then
    echo "❌ Git is not configured. Run ./scripts/setup-git.sh first"
    exit 1
fi

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "📝 Changes detected. Committing..."
    
    # Ask for commit message
    read -p "Enter commit message (or press Enter for default): " COMMIT_MSG
    
    if [ -z "$COMMIT_MSG" ]; then
        COMMIT_MSG="Update matcha gallery - $(date '+%Y-%m-%d %H:%M')"
    fi
    
    git add .
    git commit -m "$COMMIT_MSG"
    echo "✅ Changes committed"
else
    echo "⚠️  No changes to commit"
fi

echo ""
echo "📤 Pushing to GitHub..."
git push

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployed successfully!"
    echo "   Your site will be live in 1-2 minutes"
    echo ""
    
    # Try to get the GitHub username and repo name
    REMOTE_URL=$(git config --get remote.origin.url)
    if [[ $REMOTE_URL =~ github.com[:/]([^/]+)/([^/.]+) ]]; then
        USERNAME="${BASH_REMATCH[1]}"
        REPO="${BASH_REMATCH[2]}"
        echo "🌐 Visit: https://$USERNAME.github.io/$REPO/"
    fi
else
    echo ""
    echo "❌ Deploy failed. Check the error message above."
    echo "   You may need to:"
    echo "   1. Create the repository on GitHub first"
    echo "   2. Run: git push -u origin main (first time)"
fi
