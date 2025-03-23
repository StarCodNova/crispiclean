# CrispiClean - AI Food Calorie Reduction Technology

CrispiClean is a revolutionary web application that uses AI technology to analyze deep-fried foods and calculate calorie reductions. The application is designed to help health-conscious users understand the benefits of the CrispiClean oil reduction technology.

## Features

- **AI Food Analysis**: Upload images of deep-fried foods for instant calorie analysis
- **Calorie Reduction Calculation**: See before and after calorie content with CrispiClean technology
- **Personalized Health Tips**: Get food-specific advice and nutritional information
- **User-Assisted AI Learning**: Help train the AI by correcting food identification

## Technologies Used

- React (Frontend)
- TypeScript
- Express (Backend)
- AI Image Analysis
- Modern UI components with Tailwind CSS

## Deployment to GitHub Pages

### Prerequisites

- GitHub account
- Git installed on your computer

### Deployment Steps

1. **Create a GitHub Repository**:
   - Go to GitHub and create a new repository

2. **Push Your Code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/repository-name.git
   git push -u origin main
   ```

3. **Prepare Files for GitHub Pages**:
   ```bash
   # Run the preparation script
   ./prepare-gh-pages.sh
   ```

4. **Push to gh-pages Branch**:
   ```bash
   # Create and push to gh-pages branch
   git checkout -b gh-pages
   git add dist -f
   git commit -m "Add dist files for GitHub Pages"
   git push origin gh-pages
   ```

5. **Configure GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "gh-pages" branch as the source
   - Click "Save"

6. **Access Your Website**:
   - Your site will be available at `https://yourusername.github.io/repository-name/`

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

## Project Structure

- `client/`: Frontend React application
- `server/`: Backend Express server
- `shared/`: Shared code and type definitions
- `.github/workflows/`: GitHub Actions workflows for automated deployment

## Contributing

Contributions to improve CrispiClean are welcome. Please feel free to submit a pull request or open an issue for discussion.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- CrispiClean Technology by CodNova
- All contributors to the project