#!/bin/bash

# This script prepares the built files for GitHub Pages deployment

# Build the project
npm run build

# Create a .nojekyll file to bypass Jekyll processing
touch dist/.nojekyll

# Copy 404.html for SPA routing
cp client/public/404.html dist/

echo "GitHub Pages deployment files prepared successfully in the 'dist' folder."
echo "You can now push the 'dist' folder contents to your gh-pages branch."
echo ""
echo "IMPORTANT NOTES FOR DEPLOYMENT:"
echo "-------------------------------"
echo "1. Create a GitHub repository for your project if you haven't already"
echo "2. Push your code to the main branch of your repository"
echo "3. Create a gh-pages branch or configure GitHub Pages to serve from your main branch"
echo "4. In your GitHub repository settings, enable GitHub Pages and select the appropriate branch"
echo ""
echo "Your site will be available at: https://yourusername.github.io/repository-name/"