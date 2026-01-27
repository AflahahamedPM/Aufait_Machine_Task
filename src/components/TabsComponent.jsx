import React, { useState } from "react";

export default function TabsComponent({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex items-center gap-6 border-b border-gray-200 px-6 mb-10">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => setActiveTab(tab?.id)}
          className={`
                relative cursor-pointer flex items-center gap-2 py-3 px-1 text-sm font-medium
                transition-colors duration-200
                ${
                  activeTab === tab?.id
                    ? "text-primary"
                    : "text-gray-600 hover:text-gray-900"
                }
              `}
        >
          <span>{tab?.label}</span>

          <span
            className={`
                  flex items-center justify-center min-w-7 h-5 px-2
                  rounded-full text-xs font-semibold text-white
                  transition-colors duration-200
                  ${activeTab === tab?.id ? tab?.color : "bg-gray-400"}
                `}
          >
            {tab?.count}
          </span>

          {activeTab === tab?.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
}
