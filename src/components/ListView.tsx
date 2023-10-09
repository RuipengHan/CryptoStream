import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ListView.module.css";

interface Props {
  data: any[];
}

const ITEMS_PER_PAGE = 10; // Adjust this value as required

const ListView: React.FC<Props> = ({ data }) => {
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();
  const filteredData = data.filter((item) => item.asset_id.includes(query));

  // Get current page data
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination functions
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

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
        <span>{currentPage}</span>
        <button
          onClick={nextPage}
          disabled={currentItems.length < ITEMS_PER_PAGE}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListView;
