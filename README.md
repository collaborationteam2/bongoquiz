# BongoQuiz

BongoQuiz is an interactive web-based quiz application built with **React**. The application allows users to test their knowledge through quizzes covering different categories and difficulty levels.

The project was developed as a collaborative team project using **Git and GitHub**, with each team member contributing to different parts of the application.

## Features

* **Home Page** – Introduction to the application and access to quizzes.
*  **Interactive Quizzes** – Answer multiple-choice questions and test your knowledge.
*  **Multiple Categories** – Choose from different quiz topics.
*  **Difficulty Levels** – Select different levels of difficulty.
*  **Score Tracking** – See your performance after completing a quiz.
*  **Dynamic Questions** – Quiz questions are retrieved from an external API.
*  **Error Handling** – Handles API and loading errors gracefully.
*  **Responsive Design** – Designed to work across different screen sizes.
*  **About Page** – Information about the BongoQuiz project.
*  **Contact Page** – Allows users to access contact information.
*  **Login Page** – Provides a foundation for user authentication.

## Technologies Used

### Frontend

* **React** – User interface development
* **JavaScript** – Application logic
* **HTML5** – Page structure
* **CSS3** – Styling
* **React Router** – Client-side navigation

### API

BongoQuiz uses the **Open Trivia Database (OpenTDB)** API to retrieve quiz questions dynamically.

### Development Tools

* **Vite** – Development environment and build tool
* **Git** – Version control
* **GitHub** – Repository hosting and team collaboration
* **VS Code** – Code editor

## Project Structure

```text
bongoquiz/
│
├── public/
│
├── src/
│   ├── components/
│   │   └── Reusable React components
│   │
│   ├── modules/
│   │   └── API and application modules
│   │
│   ├── pages/
│   │   └── Application pages
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── package-lock.json
└── README.md
```



##  API

BongoQuiz uses the **Open Trivia Database API** to provide quiz questions.

The application sends parameters such as:

* Number of questions
* Category
* Difficulty
* Question type

The API response is then processed and displayed to the user through the React interface.

## Getting Started

### Prerequisites

Before running the project, make sure you have installed:

* [Node.js](https://nodejs.org/)
* npm
* Git

### 1. Clone the repository

```bash
git clone https://github.com/collaborationteam2/bongoquiz.git
```

### 2. Navigate into the project

```bash
cd bongoquiz
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

Open the URL in your browser to use BongoQuiz.

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Git Workflow

Because BongoQuiz is a collaborative project, development is organized using Git branches.

### Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

### Stage your changes

```bash
git add .
```

### Commit your changes

```bash
git commit -m "Describe your changes"
```

### Push your branch

```bash
git push -u origin feature/your-feature-name
```

After pushing, create a **Pull Request** on GitHub so the changes can be reviewed before being merged into `main`.

### Important

Developers should avoid making changes directly to the `main` branch unless specifically required.

## Team

BongoQuiz is being developed collaboratively by:

* Cedrick
* Wayne
* Muhsin
* Ryan
* Moses
* Nasha
* Anthony
* Baharez
* Sam

Each member contributes to different areas of the project, including UI development, React components, API integration, testing, documentation, and project management.

## Project Goals

The main goals of BongoQuiz are to:

1. Build a functional React application as a team.
2. Practice modern frontend development.
3. Learn and apply Git and GitHub collaboration workflows.
4. Work with an external API.
5. Create a simple and engaging quiz experience.
6. Practice component-based development and reusable code.
7. Improve teamwork and software development practices.

## Future Improvements

Potential future improvements include:

* User accounts and authentication
* Persistent high scores
* Leaderboards
* More quiz categories
* Timed quizzes
* Improved animations and UI
* Dark mode
* Question history
* User-created quizzes
* Better accessibility
* Deployment to a production hosting platform

## Contributing

Contributions are welcome from members of the development team.

To contribute:

1. Create a new feature branch.
2. Make your changes.
3. Test your changes locally.
4. Commit your work with a clear commit message.
5. Push your branch to GitHub.
6. Open a Pull Request.
7. Wait for the changes to be reviewed and merged.

## License

This project was created for educational and collaborative development purposes.

---

