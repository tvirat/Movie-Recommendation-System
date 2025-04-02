from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

def search_tmdb_movie(movie_title):
    url = "https://api.themoviedb.org/3/search/movie"
    
    # We store the API key in an environment variable
    api_key = os.environ.get("TMDB_API_KEY", "your_api_key_here")
    
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    
    params = {
        "query": movie_title,
        "language": "en-US",
        "page": "1"
    }
    
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        if response.status_code == 200:
            data = response.json()
            movie_id = data["results"][0]["id"] 
            return movie_id
    except requests.exceptions.RequestException as e:
        print(f"TMDB API error: {e}")
        return None


def get_tmdb_recommendations(movie_id, num_of_rec):
    if not movie_id:
        return None
        
    url = f"https://api.themoviedb.org/3/movie/{movie_id}/recommendations"
    
    # We store the API key in an environment variable
    api_key = os.environ.get("TMDB_API_KEY", "your_api_key_here")
    
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        if response.status_code == 200:
            data = response.json()
            # Extract relevant information from recommendations
            tmdb_recommendations = []
            for movie in data.get("results", [])[:num_of_rec]:  # Limit to top num_of_rec recommendations
                tmdb_recommendations.append({
                    "id": movie.get("id"),
                    "title": movie.get("title"),
                    "poster_path": movie.get("poster_path"),
                    "release_date": movie.get("release_date"),
                    "vote_average": movie.get("vote_average")
                })
            return tmdb_recommendations
    except requests.exceptions.RequestException as e:
        print(f"TMDB API recommendations error: {e}")
        return None
    

@app.route("/")
def app_run_message():
    return "<p>The backend is running successfully!</p>"


@app.route('/api-get-recommendations', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    print(f"Received data: {data}")
    try: 
        movie_title = data.get('movieTitle') 
        num_of_rec = data.get('numOfRecs') 
        if isinstance(num_of_rec, str): 
            num_of_rec = int(num_of_rec) 
        
        # Get TMDB movie data
        tmdb_movie_id = search_tmdb_movie(movie_title)

        # Get TMDB recommendations
        tmdb_recommendations = get_tmdb_recommendations(tmdb_movie_id, num_of_rec)
        return jsonify(tmdb_recommendations)
    except AttributeError as e: 
        print("Error: ", e) 
        return jsonify({"error": "Internal server error"}), 500
    
if __name__ == '__main__':
    app.run(debug=False)