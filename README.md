# 🎬 Movie Recommendation System

## 📌 Description
This project provides personalized movie recommendations using two approaches: 
- **Collaborative Filtering** for older movies based on user ratings and a **Random Classifier model** for further recommendations.
- For newly released movies not in our dataset, we integrate **The Movie Database (TMDb) API** to generate recommendations.

## 💡 Motivation
I built this project to **explore different recommendation algorithms** and understand how **collaborative filtering and machine learning models** work together to enhance movie recommendations. Additionally, integrating an external API for handling edge cases was a valuable learning experience.

---

## 📖 Index
- [Project Directory Structure](#file-folder-structure)
- [Technical Details](#technical-details)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [License](#license)
- [Feedback & Contributions](#feedback--contributions)
- [Acknowledgements](#acknowledgements)

---

## 📁 File & Folder Structure
```
📦 movie-recommendation-system
├── backend/                # Flask backend
│   ├── app.py             # Main Flask application
│   ├── main.py           # Collaborative filtering & classifier model
│   ├── requirements.txt   # Backend dependencies
│   ├── config.py          # API keys and environment variables
│   └── ...
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Pages for the app
│   │   ├── App.js         # Main app file
│   │   ├── index.js       # React entry point
│   │   └── ...
│   ├── public/            # Static files
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
├── README.md              # Project documentation
├── .gitignore             # Git ignore file
└── LICENSE                # License file
```

---

## ⚙️ Technical Details
- **Frontend:** React + Vite (deployed on **Vercel**)
- **Backend:** Python + Flask (deployed on **Render**)
- **Recommendation Models:**
  - **Collaborative Filtering** using an open-source old movie dataset (10,000+ movies, user ratings)
  - **Random Classifier Model** with `scikit-learn`
  - **TMDb API** for newly released movie recommendations
- **Main Libraries Used:** `pandas`, `numpy`, `scikit-learn`, `Flask`, `requests`
- **Database:** MySQL for storing movie dataset in a structured format

---

## 🛠 Installation (For Local Use)

### Prerequisites
- Python 3.8+
- Node.js & npm
- API key from [TMDb](https://www.themoviedb.org/)

### Backend Setup
```sh
cd backend
python -m venv venv  # Create virtual environment
source venv/bin/activate  # Activate it (Mac/Linux)
venv\Scripts\activate  # (Windows)
pip install -r requirements.txt
```
- Add your **TMDb API Key** in `config.py`:
  ```python
  TMDB_API_KEY = "your_api_key_here"
  ```
- Run the backend:
  ```sh
  python app.py
  ```

### Frontend Setup
```sh
cd frontend
npm install  # Install dependencies
npm run dev  # Start the React app
```

---

## 🚀 Usage Guide (Deployed Version)
- **Frontend:** [Live on Vercel](https://my-movie-recommendation-system.vercel.app/)
- **Backend:** [Live on Render](https://movie-recommendation-system-umw3.onrender.com/)

### How to Use
1. Ensure that the backend is running. (It should say `The backend is running successfully!`)
2. Go to the frontend link.
3. Enter a movie name.
4. Enter the number of recommendations required.
5. Click on submit to get recommendations.

![UI Preview](https://github.com/user-attachments/assets/0e597a8d-766f-4faa-a301-09aca8e13df9)


---

## 📝 License
This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 💡 Feedback & Contributions
We appreciate any feedback and bug reports! Please use the **GitHub Issues** tab to report bugs, suggest improvements, or share your thoughts. However, we are currently **not accepting further contributions** at this time.

---

## 🙌 Acknowledgements
- [TMDb](https://www.themoviedb.org/) for the movie data API.

