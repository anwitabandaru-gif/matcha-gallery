# 🍵 Matcha Journey - Cafe Gallery

A beautiful, matcha-themed website to document and share your favorite matcha cafes. Built with vanilla HTML, CSS, and JavaScript.

## Features

- ✨ Beautiful matcha-inspired design with smooth animations
- 📝 Add, edit, and delete cafe entries
- ⭐ Rate cafes with a 5-star system
- 📸 Optional image URLs for cafe photos
- 💾 Local storage persistence (data saved in your browser)
- 📱 Fully responsive design
- 🚀 Easy deployment with GitHub Pages

## Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/matcha-gallery.git
   cd matcha-gallery
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or using Node.js
   npx serve
   ```

3. Visit `http://localhost:8000` in your browser

## Deploying to GitHub Pages

### Option 1: Automatic Deployment with GitHub Actions

This repository includes a GitHub Actions workflow that automatically deploys your site whenever you push to the main branch.

1. Create a new repository on GitHub
2. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Matcha cafe gallery"
   git branch -M main
   git remote add origin https://github.com/yourusername/matcha-gallery.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**

4. The workflow will automatically deploy your site to `https://yourusername.github.io/matcha-gallery/`

### Option 2: Manual Deployment

1. Go to your repository **Settings** → **Pages**
2. Under "Source", select **Deploy from a branch**
3. Select the **main** branch and **/ (root)** folder
4. Click **Save**

Your site will be live at `https://yourusername.github.io/matcha-gallery/`

## Project Structure

```
matcha-gallery/
├── index.html          # Main HTML structure
├── styles.css          # Matcha-themed styling
├── script.js           # Gallery functionality
├── README.md           # This file
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions deployment
```

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --matcha-dark: #2d5016;
    --matcha-medium: #4a7c2f;
    --matcha-light: #7fa95c;
    /* ... */
}
```

### Fonts
The site uses Google Fonts (Cormorant and Work Sans). You can change these in the `<head>` of `index.html`.

### Sample Data
Edit the sample cafes in `script.js` in the `loadCafes()` method.

## Data Storage

Your cafe data is stored in your browser's `localStorage`. This means:
- ✅ Data persists between sessions
- ✅ No server or database needed
- ⚠️ Data is stored per browser/device
- ⚠️ Clearing browser data will delete your cafes

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT License - feel free to use this for your own cafe gallery!

## Credits

Created with ☕ and a love for matcha
