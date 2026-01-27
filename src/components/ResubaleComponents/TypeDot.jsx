const TypeDot = ({ type }) => {
  const color = type === "threat" ? "bg-[#D55008]" : "bg-[#058F4F]";

  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span className="capitalize text-sm">{type}</span>
    </div>
  );
};

export default TypeDot;
