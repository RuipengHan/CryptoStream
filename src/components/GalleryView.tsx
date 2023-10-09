import React from "react";

interface Props {
  onItemSelect: (item: any) => void;
  data: any[];
}

const GalleryView: React.FC<Props> = ({ onItemSelect, data }) => {
  return (
    <div>
      {data.map((item) => (
        <img
          key={item.asset_id}
          src={item.url}
          alt={`${item.asset_id} Icon`}
          onClick={() => onItemSelect(item)}
        />
      ))}
    </div>
  );
};

export default GalleryView;
