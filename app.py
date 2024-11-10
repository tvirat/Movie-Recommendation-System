from flask import Flask
import notebook

app = Flask(__name__)

@app.route('/api-get-recommendations', methods=['POST'])
def give_recommendations(movie_title: str, num_of_rec) -> list[str]:
    if isinstance(num_of_rec, str):
        num_of_rec = int(num_of_rec)
    
    return notebook.get_top_matches(movie_title, num_of_rec)

if __name__ == '__main__':
    app.run(debug=False)