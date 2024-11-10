import React, { Component } from "react";

class RecommendationForm extends Component {
  constructor() {
    super();
    this.state = {
      movieTitle: "",
      numRec: 3,
      recommendationsList: [],
    };
  }

  getValues = async () => {
    const numOfRecs = document.getElementById("numOfRecs").value;
    this.setState(
      {
        movieTitle: document.getElementById("movieInput").value,
        numRec: numOfRecs || this.state.numRec,
      },
      async () => {
        try {
          const response = await fetch("/api-get-recommendations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              movieTitle: this.state.movieTitle,
              numOfRecs: this.state.numRec,
            }),
          });

          // Check if response is ok before parsing JSON
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          // Parse JSON response
          const recommendations = await response.json();
          this.setState({ recommendationsList: recommendations });
        } catch (error) {
          console.error("Fetch error: ", error);
          this.setState({ recommendationsList: [] });
        }
      }
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.getValues();
  };

  render() {
    return (
      <div>
        <form id="recommendation-form" onSubmit={this.handleSubmit}>
          <label htmlFor="directions">
            Type the movie title in the text box and specify the number of
            recommendations
          </label>
          <br />
          <label htmlFor="movieName">Movie Title</label>
          <input type="text" name="movieInput" id="movieInput" />
          <br />
          <label htmlFor="numOfRecs">Number of Recommendations: </label>
          <input type="text" name="numOfRecs" id="numOfRecs" />
          <br />
          <button id="submitButton" type="submit" formMethod="POST">
            Submit
          </button>
        </form>
        {/* Displaying the recommendations */}
        <div>
          {this.state.recommendationsList.map((recommendation, index) => (
            <div key={index}>{recommendation}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default RecommendationForm;
