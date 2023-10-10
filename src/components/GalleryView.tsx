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
  const [itemsPerPage, setItemsPerPage] = useState<number>(16); // 8x8

  const navigate = useNavigate();
  // Filters data based on id and name (case insensitive):
  let filteredData = data.filter(
    (item) =>
      item.asset_id.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query)
  );

  // Filtering:
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  // Apply selected filter if any:
  if (selectedFilter === "Crypto") {
    filteredData = filteredData.filter((item) => item.type_is_crypto === 1);
  } else if (selectedFilter === "Currency") {
    filteredData = filteredData.filter((item) => item.type_is_crypto === 0);
  }

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

      {/* New Filter UI */}
      <div className={styles.filterContainer}>
        <button
          className={
            selectedFilter === "Crypto"
              ? styles.filterButtonActive
              : styles.filterButton
          }
          onClick={() =>
            setSelectedFilter((prev) => (prev === "Crypto" ? null : "Crypto"))
          }
        >
          Crypto
        </button>
        <button
          className={
            selectedFilter === "Currency"
              ? styles.filterButtonActive
              : styles.filterButton
          }
          onClick={() =>
            setSelectedFilter((prev) =>
              prev === "Currency" ? null : "Currency"
            )
          }
        >
          Currency
        </button>
      </div>

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
            <div className={styles.assetInfo}>
              <strong>{item.asset_id}</strong>
              <span>{item.name}</span>
              <span>
                Current Price: $
                {item.asset_id === "USD"
                  ? "1.00"
                  : parseFloat(item.price_usd).toFixed(2)}
              </span>
            </div>
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
          <option value="32">32 items/page</option>
          <option value="64">64 items/page</option>
        </select>
      </div>
    </div>
  );
};

export default GalleryView;
