import React from "react";

const RecommendationForm = () => {
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
      <button type="submit" onClick={retrieveTitle()} formMethod="post">
        Submit
      </button>
    </form>
  );
};

const retrieveTitle = () => {
  const formData = document
    .getElementById("recommendation-form")
    .getElementsByTagName("input");
  const title = formData[0];
  const numOfRecs = formData[1];
};

export default RecommendationForm;
