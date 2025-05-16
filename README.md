# Trending Repositories Viewer

## Objective 

Build a performant, responsive, and scalable React Native app that fetches and displays the most-starred GitHub repos from the past 10 days with infinite scroll.

--- 

## Feature 
-  Fetches **most-starred repositories** from GitHub created in the last 10 days
-  **Infinite scrolling** with performant pagination
-  Fully **responsive UI** (mobile-first with Tailwind CSS)
-  **Enterprise architecture** with modular structure, error handling, and clean code separation
-  Axios for robust API integration
-  Built using  React best practices

---

## Demo 


<img src="screenshot.png" alt="App Screenshot" width="700">

---

## Project Structure 

src/
├── api/ # API layer
├── components/ # Reusable UI components
├── constants/ # App-level constants
├── pages/ # Main screen components
├── App.jsx # Main entry component
└── main.jsx # Vite bootstrap entry


---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/ETIQA-ASSESMENT/etiqaTrendingApp.git
cd etiqatrendingapp
```


### 2. Install Dependencies 

```bash
npm install 
```


```bash
npm run dev
 
```

--- 

## Tech Stack 
 
 - 🧪 Tech Stack

 - ⚛️ React 18

 - 🔗 Axios

 - 🌊 Tailwind CSS

 - 📆 Day.js

 - 🌀 Infinite Scroll

 - ⚙️ Vite

 - ✅ PropTypes


--- 

## Script 

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
```


## Notes 

API used: https://api.github.com/search/repositories?q=created:>{date}&sort=stars&order=desc&page=1

GitHub API is rate-limited for unauthenticated requests. Add a token if needed.


## Author
Built by @vicknesh as part of the Etiqa developer assessment.