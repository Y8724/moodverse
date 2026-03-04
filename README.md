✅ Moodverse – AI-Powered Mood-Based Recommendations 🎭🤖
📌 Overview

Moodverse is a full-stack web application that provides personalized movie, book, and music recommendations based on the user’s mood.

Users can select or type their mood, and the app fetches curated content from multiple external APIs to generate meaningful entertainment suggestions.

This project demonstrates modern full-stack development using React, Node.js, Express, and third-party APIs.


✨ Features

🎭 Mood-based recommendation system

🎬 Movie suggestions (TMDB API)

📚 Book recommendations (Google Books API)

🎵 Music discovery with preview playback (Deezer API)

▶️ Audio preview player

💡 Active mood indicator

🎨 Responsive and modern UI

🔐 Secure API key management with environment variables


🛠️ Tech Stack

Frontend

React (Vite)

CSS3

React Icons

Backend

Node.js

Express.js

Axios / Fetch

Environment Variables (dotenv)

APIs

TMDB (Movies)

Google Books

Deezer (Music)


📂 Project Structure

moodverse/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── config/
│   ├── app.js
│   ├── server.js
│   └── .env.example
│
├── frontend/
│   ├── src/
│   ├── App.jsx
│   └── .env.example
│
├── README.md
└── .gitignore


⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/moodverse.git
cd moodverse


2️⃣ Backend Setup
cd backend
npm install

Create .env file:
cp .env.example .env

Fill in your API keys:
PORT=5050
TMDB_API_KEY=your_key
GOOGLE_BOOKS_KEY=your_key
DEEZER_KEY=your_key

Start backend:
npm start


Backend runs on:
http://localhost:5050



3️⃣ Frontend Setup

cd frontend
npm install


Create .env file:

cp .env.example .env


Add backend URL:

VITE_API_URL=http://localhost:5050


Start frontend:

npm run dev


Frontend runs on:

http://localhost:5173


🚀 Usage

Select a mood using the buttons

Or type your mood manually

Click Get Recommendations

Browse movies, books, and music

Play music previews

Open content in external platforms


📸 Screenshots

(Add screenshots here after deployment)

Example:

/screenshots/home.png
/screenshots/results.png


🌐 Deployment

The application can be deployed using:

Frontend: Netlify / Vercel

Backend: Render / Railway / Fly.io

Remember to configure environment variables on the hosting platform.


🧠 What I Learned

Integrating multiple external APIs

Managing async data fetching

Secure API key handling

Full-stack project architecture

UX/UI improvements

Audio playback handling in React


🔮 Future Improvements

User accounts & profiles

Save favorite recommendations

AI-generated explanations

Dark / Light mode

Recommendation history

Mobile app version


👩‍💻 Author

Yanay Sánchez García

Full-Stack Developer

Portfolio Project

GitHub: https://github.com/Y8724


📄 License

This project is licensed under the MIT License.


❤️ Acknowledgments

TMDB API

Google Books API

Deezer API

Open-source community