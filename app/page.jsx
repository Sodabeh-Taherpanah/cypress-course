
"use client"
import React, { useState } from "react";

function App() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Fetch API Example</h1>
      <button onClick={fetchData} style={{ padding: "10px", fontSize: "16px" }}>
        Fetch Data
      </button>
      {data && (
        <div style={{ marginTop: "20px" }}>
          <h2>API Response:</h2>
          <p><strong>Title:</strong> {data.title}</p>
          <p><strong>Body:</strong> {data.body}</p>
        </div>
      )}
    </div>
  );
}

export default App;
