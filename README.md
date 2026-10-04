# QuickNotes

QuickNotes is a simple, elegant note-taking web application that allows users to quickly capture, organize, and search their thoughts. Built with vanilla HTML, CSS, and JavaScript, it demonstrates core web development skills including DOM manipulation, form handling, data validation, local storage persistence, and responsive design. Notes can be categorized as Personal, Work, or Study, each with its own visual style, and all data persists across page refreshes using the browser's localStorage API.

## Features

- **Add notes** with a title and category (Personal, Work, or Study)
- **Delete individual notes** with a single click
- **Search notes** in real-time as you type (case-insensitive)
- **Input validation** — prevents empty notes and notes over 200 characters
- **Data persistence** — notes are saved to localStorage and survive page refreshes
- **Responsive design** — works beautifully on desktop and mobile devices
- **Category styling** — each category has a distinct left-border color
- **Note counter** — dynamically shows how many notes you have
- **Clear all** — bonus feature to delete all notes with confirmation

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/quicknotes-app.git
   ```

2. Navigate to the project folder:
   ```bash
   cd quicknotes-app
   ```

3. Open `index.html` in your browser:
   - Double-click the file, or
   - Use a local server:
     ```bash
     npx serve .
     ```
   - Then visit `http://localhost:3000` in your browser.

No build tools or dependencies are required — this is a pure HTML/CSS/JS project.

## What I Learned

1. **DOM Manipulation with createElement and textContent** — I learned how to dynamically build and update the UI using `document.createElement()` and `textContent` instead of `innerHTML`, which is safer and prevents XSS vulnerabilities when rendering user-generated content.

2. **localStorage for Data Persistence** — I gained hands-on experience using `localStorage.setItem()` with `JSON.stringify()` to save data and `JSON.parse()` to retrieve it, understanding how to persist state across page refreshes without a backend server.

3. **Responsive Design with Flexbox and Media Queries** — I learned how to use CSS Flexbox to create flexible form layouts and `@media (max-width: 600px)` queries to adapt the design for smaller screens, ensuring the app works well on both desktop and mobile devices.

4. **Form Validation and User Feedback** — I practiced implementing client-side validation with clear error messages, learning how to provide immediate feedback to users when their input doesn't meet requirements.

5. **Semantic HTML Structure** — I improved my understanding of semantic elements like `<header>`, `<main>`, `<section>`, and `<footer>`, and how proper label-input associations improve accessibility.
