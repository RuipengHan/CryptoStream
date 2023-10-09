import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListView from "./components/ListView";
import GalleryView from "./components/GalleryView";
import DetailView from "./components/DetailView";

import axios from "axios";

const App: React.FC = () => {
  // const data = [
  //   { id: 1, name: "Bitcoin", imageUrl: "...", description: "..." },
  //   // ... other data
  // ];
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://rest.coinapi.io/v1/assets/icons/32",
        {
          headers: {
            "X-CoinAPI-Key": "10E86574-F2B3-4C3A-A9A9-A0C22E85E079",
          },
        }
      );

      setData(result.data); // Or adjust based on the structure of the API response
    };

    fetchData();
  }, []);

  // Just as a fallback if the API call hasn't completed yet
  if (!data.length) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListView data={data} />} />
        <Route path="/gallery" element={<GalleryView data={data} />} />
        <Route path="/detail/:itemId" element={<DetailView data={data} />} />
      </Routes>
    </Router>
  );
};

export default App;
