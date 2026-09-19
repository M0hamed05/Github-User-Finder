<div align="center">

  # 🔍 GitHub User Finder

  [![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Interactive_App-007bff?style=for-the-badge&logo=github)](https://m0hamed05.github.io/Github-User-Finder/)

</div>

---

### 🎥 Project Walkthrough

https://github.com/user-attachments/assets/9271d847-cbda-4457-ade6-57f565f90731

---

## 📝 About The Project

GitHub User Finder is a clean, fully responsive web application built with **Vanilla JavaScript (ES6 Modules)** that interacts with the GitHub REST API. It allows users to search for any GitHub developer and instantly view their profile metrics, top programming language insights, and latest public repositories.

The application is structured using **Clean Code Architecture**, strictly separating concerns into distinct ES6 modules to ensure high maintainability, code clarity, and scalability.

Built as a practical project to master REST API integration, asynchronous JavaScript, and persistent state management using LocalStorage, it strictly follows **Clean Code Architecture** by separating concerns into distinct ES6 modules.

## ✨ Key Features

* **Real-Time API Integration:** Asynchronously fetches user profiles and repository data using `async/await` and the Fetch API.
* **Data Processing & Analytics:** Uses High-Order Array Methods (`reduce`, `sort`, `map`) to dynamically calculate the user's most used language and sort repositories chronologically.
* **Search History Persistence:** Stores search history in `localStorage` and provides auto-complete suggestions via a native HTML `<datalist>`.
* **Dynamic Theme Toggle:** Supports Dark and Light themes using CSS Custom Properties, persisting the user's theme preference.
* **Error & Rate-Limit Handling:** Manages API rate limits (403), non-existent users (404), and connection timeouts using `AbortController`.
* **Mobile-First Responsive Design:** Fully optimized for mobile viewports using CSS Grid, Flexbox, and Media Queries (tested on real devices).


## 🛠️ Built With

* **HTML5** (Semantic layout & Native Datalist)
* **CSS3** (CSS Variables, Grid, Flexbox & Media Queries)
* **Vanilla JavaScript** (ES6+ Modules, DOM Manipulation, High-Order Functions)
* **GitHub REST API**

## 📂 Project Architecture (ES6 Modules)

The codebase is strictly modular to enforce separation of concerns:
* `elements.js`: Acts as a centralized DOM registry using ES6 Getters to fetch UI elements dynamically.
* `api.js`: Manages network requests, timeouts, and error handling.
* `logic.js`: Contains business logic, validation, data filtering, and search history management.
* `ui.js`: Handles DOM updates, element rendering, and theme application.
* `main.js`: The entry point that initializes event listeners and connects the modules.

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/M0hamed05/github-user-finder.git
