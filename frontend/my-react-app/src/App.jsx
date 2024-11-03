import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RecommendationForm from "./components/RecommendationForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <RecommendationForm></RecommendationForm>
      </div>
    </>
  );
}

export default App;
