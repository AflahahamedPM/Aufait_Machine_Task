import React from "react";
import ThreatCounts from "./ThreatCounts";
import TabsComponent from "./TabsComponent.jsx";
import ActionContainer from "./ActionContainer.jsx";
import TableComponent from "./ResubaleComponents/TableComponent";
import useRiskServices from "../services/useRiskServices";
import { riskColumns } from "./ResubaleComponents/tableHeader";

const RiskManagment = () => {
  const riskServices = useRiskServices();

  return (
    <div>
      <div className="flex gap-16 items-center mb-6">
        <h1 className="text-xl text-[#231F20] font-semibold">
          Enterprise Risk Management
        </h1>
        <ThreatCounts threats={riskServices?.threats}/>
      </div>
      <TabsComponent
        tabs={riskServices?.tabs}
        activeTab={riskServices?.activeTab}
        setActiveTab={riskServices?.setActiveTab}
      />
      <ActionContainer {...riskServices} />

      <TableComponent
        tableData={riskServices?.filteredRiskDatas}
        columns={riskColumns}
      />
    </div>
  );
};

export default RiskManagment;
