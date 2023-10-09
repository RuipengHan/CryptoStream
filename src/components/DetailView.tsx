// DetailView.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    <div>
      <h1>{item.asset_id}</h1>
      <img src={item.url} alt={`${item.asset_id} Icon`} />

      {prevItem && (
        <button onClick={() => navigate(`/detail/${prevItem.asset_id}`)}>
          Previous
        </button>
      )}
      {nextItem && (
        <button onClick={() => navigate(`/detail/${nextItem.asset_id}`)}>
          Next
        </button>
      )}
    </div>
  );
};

export default DetailView;
