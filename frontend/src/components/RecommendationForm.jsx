import React, { Component } from "react";
import "./RecommendationForm.css";

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
          const apiUrl = import.meta.env.VITE_API_URL;
          const response = await fetch(`${apiUrl}/api-get-recommendations`, {
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
          // Parse JSON response
          const recommendations = await response.json();
          console.log("Raw API response:", recommendations);

          // Check the response format and extract just the titles
          if (Array.isArray(recommendations)) {
            // If it's an array of objects with title property
            const movieTitles = recommendations.map((movie) =>
              typeof movie === "object" && movie.title ? movie.title : movie
            );
            this.setState({ recommendationsList: movieTitles });
          } else {
            // Handle case where response isn't in expected format
            console.error("Unexpected response format:", recommendations);
            this.setState({
              recommendationsList: ["No recommendations found"],
            });
          }
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
      <div className="recommendation-container">
        <h2 className="form-title">Movie Recommendation System</h2>
        <form id="recommendation-form" onSubmit={this.handleSubmit}>
          <p className="form-description">
            Type the movie title in the text box and specify the number of
            recommendations
          </p>
          <div className="form-group">
            <label htmlFor="movieInput">Movie Title</label>
            <input
              type="text"
              name="movieInput"
              id="movieInput"
              placeholder="Enter a movie title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="numOfRecs">Number of Recommendations</label>
            <input
              type="text"
              name="numOfRecs"
              id="numOfRecs"
              placeholder="3"
            />
          </div>
          <button id="submitButton" type="submit">
            Submit
          </button>
        </form>
        {/* Displaying the recommendations */}
        <div className="recommendations-list">
          {this.state.recommendationsList.length > 0 ? (
            this.state.recommendationsList.map((recommendation, index) => (
              <div key={index} className="recommendation-item">
                {recommendation}
              </div>
            ))
          ) : (
            <div className="loading">
              Enter a movie title to get recommendations
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RecommendationForm;
