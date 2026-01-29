# 🚀 Quick Start Guide

## Step-by-Step Setup for GitHub Pages

### 1. Test Locally First

Open `index.html` in your browser or run a local server:

```bash
# Option A: Python (if installed)
python -m http.server 8000

# Option B: Python 3
python3 -m http.server 8000

# Option C: Node.js (if installed)
npx serve

# Then visit: http://localhost:8000
```

### 2. Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon → **New repository**
3. Name it `matcha-gallery` (or any name you like)
4. Choose **Public** 
5. **Don't** initialize with README (we already have one)
6. Click **Create repository**

### 3. Push Your Code to GitHub

In your terminal, navigate to the matcha-gallery folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: Matcha cafe gallery"

# Set main as default branch
git branch -M main

# Connect to your GitHub repository (replace with your username)
git remote add origin https://github.com/YOUR-USERNAME/matcha-gallery.git

# Push to GitHub
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment"
   - Source: Select **GitHub Actions**
5. Wait about 1-2 minutes for the deployment

### 5. Visit Your Live Site! 🎉

Your site will be live at:
```
https://YOUR-USERNAME.github.io/matcha-gallery/
```

## Making Updates

After making changes to your site:

```bash
git add .
git commit -m "Update cafe information"
git push
```

The GitHub Action will automatically redeploy your site!

## Troubleshooting

### Issue: Site not deploying
- Check the **Actions** tab in your GitHub repository
- Make sure the workflow completed successfully (green checkmark)

### Issue: 404 Page Not Found
- Wait 2-3 minutes after first deployment
- Check Settings → Pages to confirm the source is set to "GitHub Actions"
- Verify your repository is public

### Issue: Changes not showing
- Hard refresh your browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Wait a minute for GitHub Actions to complete

### Issue: Can't push to GitHub
- Make sure you've replaced `YOUR-USERNAME` with your actual GitHub username
- Check if you need to authenticate with GitHub (you may need to set up a personal access token)

## Next Steps

1. **Customize the design**: Edit colors in `styles.css`
2. **Add your cafes**: Click the "+ Add New Cafe" button
3. **Add photos**: Use image URLs from your favorite hosting service
4. **Share**: Send your live site URL to friends!

## Tips for Image URLs

You can use:
- **Direct image links** from cafes' websites
- **Upload to Imgur** (imgur.com) and use the direct link
- **GitHub**: Put images in an `images/` folder in your repo and reference them as `images/photo.jpg`
- **Google Photos**: Share a photo and use the direct link

---

Need help? Create an issue on GitHub or check the full README.md!
