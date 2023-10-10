import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ListView.module.css";

interface Props {
  data: any[];
}

const DEFAULT_ITEMS_PER_PAGE = 5;

const ListView: React.FC<Props> = ({ data }) => {
  const [currentView] = useState<string>("list");

  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    DEFAULT_ITEMS_PER_PAGE
  );

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
      <ul className={styles.list}>
        {currentItems.map((item) => (
          <li
            key={item.asset_id}
            className={styles.listItem}
            onClick={() => navigate(`/detail/${item.asset_id}`)}
          >
            <img
              src={item.url}
              alt={`${item.asset_id} Icon`}
              className={styles.icon}
            />
            <div className={styles.itemInfo}>
              <div className={styles.assetIdName}>
                <strong>{item.asset_id}</strong> - {item.name}
              </div>
              <div className={styles.datePrice}>
                <span>Date Released: {item.data_start}</span>
                {/* <span>Price: ${item.price_usd}</span> */}
                {/* <span>Price: $ {parseFloat(item.price_usd).toFixed(2)}</span> */}
                <span>
                  Current Price: $
                  {item.asset_id === "USD"
                    ? "1.00"
                    : parseFloat(item.price_usd).toFixed(2)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>

        {/* Input for navigating to a specific page */}
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

        {/* Dropdown to select items per page */}
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to the first page
          }}
          className={styles.itemsDropdown}
        >
          <option value="5">5 items/page</option>
          <option value="10">10 items/page</option>
          <option value="20">20 items/page</option>
          <option value="50">50 items/page</option>
        </select>
      </div>
    </div>
  );
};

export default ListView;
