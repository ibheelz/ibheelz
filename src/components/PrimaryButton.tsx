import Link from "next/link";

interface PrimaryButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function PrimaryButton({
  label,
  href,
  onClick,
  type = "button",
  className = "",
}: PrimaryButtonProps) {
  const baseClass = "px-5 py-2.5 rounded text-base font-medium bg-red text-black hover:bg-red-dim transition-colors duration-200";
  const combined = `${baseClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combined}>
        {label}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combined}>
      {label}
    </button>
  );
}
