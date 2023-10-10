// DetailView.tsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DetailView.module.css";

interface Props {
  data: any[];
}

const DetailView: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const { itemId } = useParams();

  const item = data.find((d) => d.asset_id === itemId);

  const currentIndex = data.indexOf(item);
  const prevItem = data[currentIndex - 1];
  const nextItem = data[currentIndex + 1];

  // New state variable for the current index input
  const [inputIndex, setInputIndex] = useState<number>(currentIndex + 1);

  const handleIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = parseInt(e.target.value, 10);
    setInputIndex(newIndex);
  };

  const handleIndexSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputIndex > 0 && inputIndex <= data.length) {
      const targetItem = data[inputIndex - 1];
      navigate(`/detail/${targetItem.asset_id}`);
    }
  };

  const handlePrevClick = () => {
    if (prevItem) {
      setInputIndex(currentIndex); // Change the input index to the previous item's index
      navigate(`/detail/${prevItem.asset_id}`);
    }
  };

  const handleNextClick = () => {
    if (nextItem) {
      setInputIndex(currentIndex + 2); // Change the input index to the next item's index
      navigate(`/detail/${nextItem.asset_id}`);
    }
  };

  return (
    <div className={styles.detailContainer}>
      {/* List and Gallery buttons */}
      <div className={styles.viewSwitch}>
        <button className={styles.switchButton} onClick={() => navigate("/")}>
          List
        </button>
        <button
          className={styles.switchButton}
          onClick={() => navigate("/gallery")}
        >
          Gallery
        </button>
      </div>

      {/* Details section */}
      <div className={styles.detailCard}>
        <img
          src={item.url}
          alt={`${item.asset_id} Icon`}
          className={styles.icon}
        />
        <div className={styles.assetID}>
          <strong>{item.asset_id}</strong> - {item.name}
        </div>
        <div>Date Released: {item.data_start}</div>
        <div>
          Current Price: $
          {item.asset_id === "USD"
            ? "1.00"
            : parseFloat(item.price_usd).toFixed(2)}
        </div>
      </div>

      {/* Navigation buttons section */}
      <div className={styles.navButtons}>
        {prevItem ? (
          <button onClick={handlePrevClick}>Previous</button>
        ) : (
          <div className={styles.placeholderButton}></div>
        )}

        <div className={styles.itemIndicator}>
          <input
            type="number"
            value={inputIndex}
            onChange={handleIndexChange}
            onKeyPress={handleIndexSubmit}
            className={styles.itemIndexInput}
          />
          <span>/ {data.length}</span>
        </div>

        {nextItem ? (
          <button onClick={handleNextClick}>Next</button>
        ) : (
          <div className={styles.placeholderButton}></div>
        )}
      </div>
    </div>
  );
};

export default DetailView;
