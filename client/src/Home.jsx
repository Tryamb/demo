import React, { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log("stored ", [...data]);

 
  return (
    <main className="main-container">
      <div className="main-title">
        <h3>WELCOME</h3>
      </div>
    </main>
  );
}

export default Home;
