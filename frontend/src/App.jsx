import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Log environment variables
const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

console.log("Backend URL:", API_URL);
console.log("API Key:", API_KEY);

function App() {
  const [count, setCount] = useState(0);
  const [apiResponse, setApiResponse] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/test`)
      .then((response) => response.json())
      .then((data) => setApiResponse(data.message))
      .catch((error) => setApiResponse("Error connecting to backend"));
  }, [API_URL]); // Added dependency array

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* API Response */}
      <h2>Backend Response:</h2>
      <p>{apiResponse}</p>
    </>
  );
}

export default App;



