import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ListView.module.css";

interface Props {
  data: any[];
}

const DEFAULT_ITEMS_PER_PAGE = 5;

const ListView: React.FC<Props> = ({ data }) => {
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    DEFAULT_ITEMS_PER_PAGE
  );

  const navigate = useNavigate();
  const filteredData = data.filter((item) => item.asset_id.includes(query));

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
      <input
        type="text"
        placeholder="Search by Asset ID..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
            {item.asset_id}
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
