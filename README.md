# Interactive Portfolio Town

[![日本語README](https://img.shields.io/badge/README-日本語-0ea5e9?style=for-the-badge)](README.ja.md)
[![Open Live Site](https://img.shields.io/badge/Open-Live%20Site-22c55e?style=for-the-badge)](https://tm-project20203.github.io/profile/)

A game-style portfolio website built with plain HTML, CSS, and JavaScript.

Visitors move around a small illustrated town, approach buildings, and press a key to open portfolio sections such as About, Experience, Projects, Skills, and Contact.

## Highlights

- Canvas-based interactive town map
- Keyboard movement and interaction system
- Bilingual UI (English and Japanese)
- Modal-based content panels for each section
- Single-page app with separated files for maintainability

## Controls

- Move: W A S D or Arrow keys
- Interact: E
- Close modal: Escape
- Language switch: top-right language button

## Project Structure

- index.html: page structure and UI containers
- styles.css: all styles and responsive layout rules
- script.js: game logic, translations, rendering, and interactions

## Run Locally

1. Clone or download this repository.
2. Open the project folder.
3. Open index.html in a browser.

If your browser blocks local scripts, run a small local server instead.

Example with Python:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to Settings > Pages.
3. Set source to your main branch (root).
4. Save and wait for the Pages URL to be generated.

## Customization Tips

- Update text content in script.js under the translations object.
- Replace placeholder links in the Contact section.
- Adjust colors and visual style in styles.css.
- Replace canvas-drawn shapes with custom pixel art if desired.

## License

Use and modify freely for personal portfolio purposes.
