import React from "react";
import { searchIcon } from "../images";

const SearchComponent = (props) => {
  return (
    <div className="flex-1 relative w-90">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400">
        <img src={searchIcon} alt="search" className="w-4 h-4" />
      </div>
      <input
        value={props?.searchInput}
        onChange={(e) => props?.setSearchInput(e.target.value)}
        type="text"
        placeholder="Find..."
        className="w-full pl-10 pr-4 py-2 border border-[#D1D1D1] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
};

export default SearchComponent;
