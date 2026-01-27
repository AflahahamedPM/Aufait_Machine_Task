const statusStyles = {
  new: "bg-[#7A54D1] ",
  underMitigation: "bg-[#137DB7]",
  pendingMitigation: "bg-[#B56842] ",
  sentForClosure: "bg-[#058F8D]",
  escalated: "bg-[#DE5454]",
  draft: "bg-[#E24B9E]",
  closed: "bg-[#648696]",
};

const statusLabels = {
  new: "New",
  underMitigation: "Under Mitigation",
  pendingMitigation: "Pending Mitigation",
  sentForClosure: "Sent for Closure",
  escalated: "Escalated",
  draft: "Draft",
  closed: "Closed",
};

const StatusBackground = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-white text-xs font-semibold whitespace-nowrap
        ${statusStyles[status]}
      `}
    >
      {statusLabels[status] || status}
    </span>
  );
};

export default StatusBackground;
