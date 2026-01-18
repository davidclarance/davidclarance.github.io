# 🥪 David's Year of Sandwiches

A minimal, clean static website for documenting your sandwich journey throughout the year.

## Features

- **Counter**: Automatically counts total sandwiches from your data
- **Static List**: Display all sandwiches with place, rating, and review
- **YAML Backend**: Simple text-based data storage
- **Responsive Design**: Works on desktop and mobile

## Setup for GitHub Pages

1. Push this repository to GitHub
2. Go to your repository Settings
3. Navigate to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Select the `main` branch and `/ (root)` folder
6. Click Save
7. Your site will be live at `https://[username].github.io/yearofsandwiches/`

## How to Add Sandwiches

Edit `data.yaml` to add new sandwiches. Follow this format:

```yaml
sandwiches:
  - place: "Place Name"
    link: "https://maps.google.com/?q=Place+Name"
    rating: 5
    review: "Your one-line review here"

  - place: "Another Place"
    link: "https://example.com"
    rating: 4
    review: "Another tasty review"
```

### Fields:
- **place**: Restaurant or shop name
- **link**: URL to location (Google Maps, website, etc.)
- **rating**: Number from 1-5
  - 5 = Legendary
  - 4 = Great
  - 3 = Good
  - 2 = Okay
  - 1 = Meh
- **review**: One-line review or comment

After editing `data.yaml`, commit and push to GitHub. The site will automatically update.

## Local Development

To test locally, you need a local web server (due to YAML file loading):

```bash
# Python 3
python -m http.server 8000

# Or use any other local server
npx serve
```

Then open `http://localhost:8000` in your browser.

## Customization

Feel free to customize:
- Colors in `styles.css` (current accent colors: mustard yellow #F2C94C and tomato red #E74C3C)
- Rating labels in `script.js`
- Page title and header text in `index.html`

## Tech Stack

- Pure HTML, CSS, and JavaScript
- js-yaml library for YAML parsing
- No build tools or backend required
- GitHub Pages for hosting

Enjoy your sandwich journey! 🥪
