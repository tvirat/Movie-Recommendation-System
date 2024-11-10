import React, { Component } from "react";

class RecommendationForm extends Component {
  constructor() {
    super();
    this.state = {
      movieTitle: "",
      numRec: 3,
    };
  }

  getValues = () => {
    const numOfRecs = document.getElementById("numOfRecs").value;
    this.setState(
      {
        movieTitle: document.getElementById("movieInput").value,
        numRec: numOfRecs || this.state.numRec,
      },
      () => {
        response = fetch("/api-get-recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            movieTitle: this.state.movieTitle,
            numOfRecs: this.state.numRec,
          }),
        });
      }
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.getValues();
  };

  render() {
    return (
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
    );
  }
}

export default RecommendationForm;
