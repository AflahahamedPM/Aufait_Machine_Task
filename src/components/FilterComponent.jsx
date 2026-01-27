import React from "react";
import { filterIcon } from "../images";

const FilterComponent = () => {
  return (
    <button className="flex cursor-pointer gap-3 items-center justify-center border border-[#D1D1D1] rounded-md p-2">
      <img src={filterIcon} alt="filter" className="w-4 h-4" />
      <span className="text-sm text-[#7A7A7A] ">Filters</span>
    </button>
  );
};

export default FilterComponent;
