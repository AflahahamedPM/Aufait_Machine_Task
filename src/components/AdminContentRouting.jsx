import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RiskManagment from "./RiskManagment";

const AdminContentRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/risk-management" replace />} />

      <Route path="/risk-management" element={<RiskManagment />} />

      <Route
        path="*"
        element={<h3 className="text-3xl">Coming soon...</h3>}
      />
    </Routes>
  );
};

export default AdminContentRouting;
