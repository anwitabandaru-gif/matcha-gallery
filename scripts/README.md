# Scripts for Matcha Gallery

Quick reference for the included helper scripts.

## Available Scripts

### `start-server.sh`
Start a local development server to preview your site.

```bash
./scripts/start-server.sh
```

Then visit: http://localhost:8000

### `setup-git.sh`
Configure Git and set up your GitHub repository connection.

```bash
./scripts/setup-git.sh
```

This will:
- Configure your Git username and email
- Initialize the repository (if needed)
- Add your GitHub remote

### `deploy.sh`
Quick commit and push your changes to GitHub.

```bash
./scripts/deploy.sh
```

This will:
- Commit any changes with a message
- Push to GitHub
- Trigger automatic deployment via GitHub Actions

## Quick Start Workflow

1. **First time setup:**
   ```bash
   ./scripts/setup-git.sh
   git push -u origin main
   ```

2. **Start local development:**
   ```bash
   ./scripts/start-server.sh
   ```

3. **Deploy updates:**
   ```bash
   ./scripts/deploy.sh
   ```

## Troubleshooting

If you get "Permission denied" errors, make the scripts executable:

```bash
chmod +x scripts/*.sh
```

## Manual Git Commands

If you prefer to use git commands directly:

```bash
# Commit changes
git add .
git commit -m "Your message here"

# Push to GitHub
git push

# First time push
git push -u origin main
```
