// DetailView.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DetailView.module.css";

interface Props {
  data: any[];
}

const DetailView: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const { itemId } = useParams();

  const item = data.find((d) => d.asset_id === itemId);

  if (!item) return <div>Item not found</div>;

  const currentIndex = data.indexOf(item);
  const prevItem = data[currentIndex - 1];
  const nextItem = data[currentIndex + 1];

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailCard}>
        <img
          src={item.url}
          alt={`${item.asset_id} Icon`}
          className={styles.icon}
        />
        <div className={styles.assetID}>{item.asset_id}</div>
      </div>

      <div className={styles.navButtons}>
        {prevItem ? (
          <button onClick={() => navigate(`/detail/${prevItem.asset_id}`)}>
            Previous
          </button>
        ) : (
          <div></div> /* Empty div as a placeholder */
        )}
        {/* Display the current item number out of total items */}
        <div className={styles.itemCount}>
          {currentIndex + 1} of {data.length}
        </div>
        {nextItem ? (
          <button onClick={() => navigate(`/detail/${nextItem.asset_id}`)}>
            Next
          </button>
        ) : (
          <div></div> /* Empty div as a placeholder */
        )}
      </div>
    </div>
  );
};

export default DetailView;
