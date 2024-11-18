import React, { useEffect } from "react";

function Test() {
  useEffect(() => {
    // Fetch request to test connection with Django backend
    fetch("http://127.0.0.1:8000/api/trycoon/test/")

      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => console.log("Response from Django:", data))
      .catch((error) => console.error("Error:", error));
  }, []); // Empty dependency array means this will run once when the component mounts

  return (
    <div className="Test">
      <h1>React-Django Connection Test</h1>
    </div>
  );
}

export default Test;
