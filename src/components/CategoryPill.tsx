interface CategoryPillProps {
  label: string;
  color?: string;
}

export default function CategoryPill({ label, color = "text-white" }: CategoryPillProps) {
  const borderColor = color === "text-white" ? "border-white" : color === "text-red" ? "border-red" : "border-white";

  return (
    <div className={`inline-block border ${borderColor} ${color} px-3 py-1 rounded-full text-sm`}>
      {label}
    </div>
  );
}
