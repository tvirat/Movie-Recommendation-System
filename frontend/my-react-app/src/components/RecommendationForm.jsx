import React from "react";

const RecommendationForm = () => {
  return (
    <form>
      <label htmlFor="movieName">
        Type the movie name to get recommendations
      </label>
      <br />
      <input type="text" name="movieInput" id="movieInput" />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default RecommendationForm;
