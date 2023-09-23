import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_REACT_VAR_KEY;
    const apiUrl = 'https://www.signalhire.com/api/v1/candidate/search';


    const searchParameters = {
      items: [
        "https://www.linkedin.com/in/url1",
        "test@email.com",
        "+44 0 808 189 3171"
      ],
      callbackUrl: "https://yourdomain.com/callback-endpoint", // Replace with our callback URL
    };

    fetch(`apiUrl`, {
      method: 'POST',
      headers: {
        'apikey': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchParameters),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received credit data:", data);
    setSearchResults(data)
    setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <>
      <h1>Signal Hire API Testing</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div>
      <h1>SignalHire Candidate Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {searchResults.map(result => (
            <li key={result.id}>
              {result.name} - {result.email}
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
}

export default App;
