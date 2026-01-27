import React from "react";
import { boxWarningIcon, highpriorityIcon, warningIcon } from "../images";

const ThreatCounts = ({threats}) => {
  
  return (
    <div className="p-3 flex justify-center items-center bg-[#F8F8F8] rounded-3xl border border-[#E7E7E7]">
      {threats?.map((threat, index) => (
        <div key={index} className="flex items-center mr-4">
          <img src={threat?.imageUrl} alt={threat?.label} className="w-6 h-6 mr-2" />
          <span className="text-xl font-medium">{threat?.count}</span>
          <span className="text-sm text-[#7A7A7A] ml-1">{threat?.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ThreatCounts;
