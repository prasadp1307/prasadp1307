interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  glow = false,
  hover = false,
  padding = "md",
  onClick,
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      onClick={onClick}
      className={`
        card
        ${paddings[padding]}
        ${glow ? "shadow-md ring-1 ring-slate-200/50" : ""}
        ${hover ? "card-hover cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
