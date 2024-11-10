from flask import Flask, jsonify, request
from flask_cors import CORS
import main

app = Flask(__name__)
CORS(app)

@app.route('/api-get-recommendations', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    print(f"Received data: {data}")
    try: 
        movie_title = data.get('movieTitle') 
        num_of_rec = data.get('numOfRecs') 
        if isinstance(num_of_rec, str): 
            num_of_rec = int(num_of_rec) 
        
        recommendations = main.get_top_matches(movie_title, num_of_rec) 
        return jsonify(recommendations)
    except AttributeError as e: 
        print("Error: ", e) 
        return jsonify({"error": "Internal server error"}), 500
if __name__ == '__main__':
    app.run(debug=False)