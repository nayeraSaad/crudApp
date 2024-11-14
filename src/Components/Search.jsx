import { useState } from "react";
import { useEffect } from "react";
import PropTypes from 'prop-types';

export default function Search({items, onSearch}) {
   
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    onSearch(filtered); // Pass the filtered results back to Home
  }, [searchItem, items,onSearch])

  return (
    <div className="d-flex justify-content-center mb-4">
    <input
      type="text"
      className=" rounded w-25"
      placeholder=" Search ... "
      onChange={(event) => setSearchItem(event.target.value)}
      value={searchItem}
    ></input>
   
  </div>
  );
}
Search.propTypes = {
  onSearch: PropTypes.func.isRequired,         
  items: PropTypes.object,
};
