import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GalleryView.module.css";

interface Props {
  data: any[];
}

const GalleryView: React.FC<Props> = ({ data }) => {
  const [currentView] = useState<string>("gallery");

  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(32); // 8x8

  const navigate = useNavigate();
  // const filteredData = data.filter((item) => item.asset_id.includes(query));
  // Filters data based on id and name (case insensitive):
  const filteredData = data.filter(
    (item) =>
      item.asset_id.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query)
  );
  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className={styles.container}>
      <div className={styles.viewSwitch}>
        <button
          className={
            styles.listViewButton +
            (currentView === "list" ? " " + styles.active : "")
          }
          onClick={() => navigate("/")}
        >
          List View
        </button>
        <button
          className={
            styles.galleryViewButton +
            (currentView === "gallery" ? " " + styles.active : "")
          }
          onClick={() => navigate("/gallery")}
        >
          Gallery View
        </button>
      </div>
      <input
        type="text"
        placeholder="Search by Asset ID..."
        value={query}
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
        className={styles.searchInput}
      />
      <div className={styles.grid}>
        {currentItems.map((item) => (
          <div
            key={item.asset_id}
            className={styles.gridItem}
            onClick={() => navigate(`/detail/${item.asset_id}`)}
          >
            <img
              src={item.url}
              alt={`${item.asset_id} Icon`}
              className={styles.icon}
            />
            {item.asset_id}
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <div>
          <input
            type="number"
            value={currentPage}
            onChange={(e) => {
              const pageNum = Number(e.target.value);
              setCurrentPage(
                pageNum <= totalPages
                  ? pageNum >= 1
                    ? pageNum
                    : 1
                  : totalPages
              );
            }}
            className={styles.pageInput}
          />
          <span>/ {totalPages}</span>
        </div>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className={styles.itemsDropdown}
        >
          <option value="16">16 items/page</option>
          <option value="64">64 items/page</option>
          <option value="32">32 items/page</option>
        </select>
      </div>
    </div>
  );
};

export default GalleryView;
