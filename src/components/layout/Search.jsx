import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  
  const onSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/search/${searchKeyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <form onSubmit={onSearch}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
