import Link from "next/link";

interface SecondaryButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function SecondaryButton({
  label,
  href,
  onClick,
  type = "button",
  className = "",
}: SecondaryButtonProps) {
  const baseClass = "px-5 py-2.5 rounded text-base font-medium border border-red text-red bg-transparent hover:bg-red hover:text-black transition-colors duration-200";
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
