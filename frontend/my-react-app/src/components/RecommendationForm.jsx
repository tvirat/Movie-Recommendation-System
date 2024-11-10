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
    this.setState({
      movieTitle: document.getElementById("movieInput").value,
      numRec: numOfRecs || this.state.numRec,
    });
    Event.pre;
  };

  render() {
    return (
      <form id="recommendation-form">
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
        <button
          id="submitButton"
          type="submit"
          onClick={() => this.getValues()}
          onSubmit={() => event.preventDefault()}
          formMethod="post"
        >
          Submit
        </button>
      </form>
    );
  }
}

export default RecommendationForm;
