import React from "react";
import { downBlackIcon, downloadIcon } from "../images";

const DownloadComponent = () => {
  return (
    <button className="flex cursor-pointer gap-1 items-center justify-center border border-[#D1D1D1] rounded-md p-2">
      <img src={downloadIcon} alt="filter" className="w-4 h-4" />
      <img src={downBlackIcon} alt="filter" className="w-4 h-4" />
    </button>
  );
};

export default DownloadComponent;
