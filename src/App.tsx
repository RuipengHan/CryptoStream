import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ListView from "./components/ListView";
import GalleryView from "./components/GalleryView";
import DetailView from "./components/DetailView";

import axios from "axios";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const icon_data = await axios.get(
        "https://rest.coinapi.io/v1/assets/icons/32",
        {
          headers: {
            "X-CoinAPI-Key": "10E86574-F2B3-4C3A-A9A9-A0C22E85E079",
          },
        }
      );
      const icon_data_json = icon_data.data;

      const asset_data = await axios.get("https://rest.coinapi.io/v1/assets", {
        headers: {
          "X-CoinAPI-Key": "10E86574-F2B3-4C3A-A9A9-A0C22E85E079",
        },
      });
      const asset_data_json = asset_data.data;

      // Merge data
      const mergedData = icon_data_json.map((icon_item: any) => {
        const asset_item = asset_data_json.find(
          (a: any) => a.asset_id === icon_item.asset_id
        );
        return { ...icon_item, ...asset_item };
      });

      setData(mergedData); // Or adjust based on the structure of the API response
      // console.log(mergedData[0]);
    };

    fetchData();
  }, []);

  // Just as a fallback if the API call hasn't completed yet
  if (!data.length) return <div>Loading...</div>;

  return (
    <Router>
      <div className={styles.contentMargin}>
        <Header />
        <Routes>
          <Route path="/" element={<ListView data={data} />} />
          <Route path="/gallery" element={<GalleryView data={data} />} />
          <Route path="/detail/:itemId" element={<DetailView data={data} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
