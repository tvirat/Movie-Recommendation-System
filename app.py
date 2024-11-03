from flask import Flask

app = Flask(__name__)

@app.route('/')
def give_recommendations() -> list[str]:
    return ['']

if __name__ == '__main__':
    app.run(debug=False)