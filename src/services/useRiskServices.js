import { CheckValidation } from "../utils/validation";
import useAlert from "../hooks/useAlert";
import React, { useMemo, useState } from "react";
import { boxWarningIcon, highpriorityIcon, warningIcon } from "../images";

const initialState = {
  description: "",
  status: "",
  type: "",
  phase: "",
  department: "",
  impact: "",
  likelihood: "",
};

const useRiskServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(initialState);
  const { publishNotification } = useAlert();
  const [riskDatas, setRiskDatas] = useState(
    JSON.parse(localStorage.getItem("riskDatas")) || [],
  );

  const [searchInput, setSearchInput] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // filtering the main data based on the active tab and search input
  const filteredRiskDatas = useMemo(() => {
    let data = riskDatas;

    if (activeTab !== "all") {
      data = data.filter((d) => d.status === activeTab);
    }

    if (searchInput.trim()) {
      const input = searchInput.toLowerCase();

      data = data.filter(
        (d) =>
          d?.recordNo?.toLowerCase().includes(input) ||
          d?.description?.toLowerCase().includes(input) ||
          d?.status?.toLowerCase().includes(input) ||
          d?.type?.toLowerCase().includes(input) ||
          d?.phase?.toLowerCase().includes(input) ||
          d?.department?.toLowerCase().includes(input),
      );
    }

    return data;
  }, [activeTab, searchInput, riskDatas]);

  //   created a map function to get the count of datas in each tab
  const riskStats = useMemo(() => {
    const stats = {
      all: riskDatas.length,
      open: 0,
      high: 0,
      threat: 0,
      byStatus: {}, 
    };

    for (const data of riskDatas) {
      if (data.status !== "closed") stats.open++;

      if (data.status === "escalated") stats.high++;

      if (data.type === "threat") stats.threat++;

      stats.byStatus[data.status] = (stats.byStatus[data.status] || 0) + 1;
    }

    return stats;
  }, [riskDatas]);

  const tabs = useMemo(
    () => [
      {
        id: "all",
        label: "All",
        count: riskStats?.all,
        color: "bg-primary"
      },
      {
        id: "new",
        label: "New",
        count: riskStats?.byStatus?.new || 0,
        color: "bg-primary"
      },
      {
        id: "underMitigation",
        label: "Under Mitigation",
        count: riskStats?.byStatus?.underMitigation || 0,
        color: "bg-primary"
      },
      {
        id: "closed",
        label: "Closed",
        count: riskStats?.byStatus?.closed || 0,
        color: "bg-primary"
      },
    ],
    [riskStats],
  );

  const threats = useMemo(
    () => [
      {
        label: "Open Risks",
        count: riskStats.open,
        imageUrl: boxWarningIcon,
      },
      {
        label: "High Priority",
        count: riskStats.high,
        imageUrl: highpriorityIcon,
      },
      {
        label: "Threats",
        count: riskStats.threat,
        imageUrl: warningIcon,
      },
    ],
    [riskStats],
  );

  //   fields for creating a new risk
  const riskFormFields = [
    {
      name: "description",
      label: "Risk Activity Description",
      type: "text",
      placeholder: "Enter description",
      span: 2,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "New", value: "new" },
        { label: "Under Mitigation", value: "underMitigation" },
        { label: "Pending", value: "pending" },
        { label: "Pending Mitigation", value: "pendingMitigation" },
        { label: "Sent For Closure", value: "sentForClosure" },
        { label: "Escalated", value: "escalated" },
        { label: "Draft", value: "draft" },
        { label: "Closed", value: "closed" },
      ],
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: [
        { label: "Threat", value: "threat" },
        { label: "Opportunity", value: "opportunity" },
      ],
    },
    {
      name: "phase",
      label: "Phase",
      type: "select",
      placeholder: "Warranty",
      options: [
        { label: "Warrenty", value: "warrenty" },
        { label: "Transit", value: "transit" },
        { label: "Testing", value: "testing" },
        { label: "Retention", value: "retention" },
        { label: "Staffing", value: "staffing" },
        { label: "Procurement", value: "procurement" },
      ],
    },
    {
      name: "department",
      label: "Department",
      type: "text",
      placeholder: "Finance",
    },
    { name: "impact", label: "Inherent Impact (1–5)", type: "number" },
    { name: "likelihood", label: "Inherent Likelihood (1–5)", type: "number" },
  ];

  // resuable funtion to create new recordId
  const getNextRecordNo = (data) => {
    if (!data.length) return "ERM-0001";

    const numbers = data
      .map((r) => r.recordNo)
      .filter(Boolean)
      .map((id) => Number(id.replace("ERM-", "")));

    const max = Math.max(...numbers);

    return `ERM-${String(max + 1).padStart(4, "0")}`;
  };

  //function to handle creation of new risk where also validating the mandatory fields
  const handleSubmit = (e) => {
    e.preventDefault();
    const missingFields = CheckValidation(form);
    if (missingFields?.length > 0) {
      publishNotification("Please fill all mandatory fields", "error");
      return;
    }
    if (form?.impact < 1 || form?.impact > 5) {
      publishNotification("Impact must be between 1 and 5", "error");
      return;
    }

    if (form?.likelihood < 1 || form?.likelihood > 5) {
      publishNotification("Likelihood must be between 1 and 5", "error");
      return;
    }

    const recordNo = getNextRecordNo(riskDatas);

    const newRisk = {
      ...form,
      recordNo,
      createdAt: Math.floor(Date.now() / 1000),
    };

    const updatedData = [newRisk, ...riskDatas];
    localStorage.setItem("riskDatas", JSON.stringify(updatedData));
    setRiskDatas(updatedData);
    publishNotification("New risk created successfully", "success");
    setIsModalOpen(false);
    setForm(initialState);
  };

  return {
    riskFormFields,
    isModalOpen,
    setIsModalOpen,
    form,
    setForm,
    riskDatas,
    handleSubmit,
    tabs,
    activeTab,
    setActiveTab,
    filteredRiskDatas,
    searchInput,
    setSearchInput,
    threats,
  };
};

export default useRiskServices;
