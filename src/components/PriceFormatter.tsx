
"use client";

interface PriceFormatterProps {
  amount: number;
  className?: string;
}

export default function PriceFormatter({
  amount,
  className = "",
}: PriceFormatterProps) {
  return (
    <span className={className}>
      {new Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
        maximumFractionDigits: 0,
      }).format(amount)}
    </span>
  );
}
