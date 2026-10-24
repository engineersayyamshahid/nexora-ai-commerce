
"use client";

import type { Product } from "@/sanity.types";
import { Minus, Plus } from "lucide-react";
import useStore from "@/store";

interface QuantityButtonsProps {
  product: Product;
}

export default function QuantityButtons({
  product,
}: QuantityButtonsProps) {
  const { addItem, removeItem, getItemCount } = useStore();

  const quantity = getItemCount(product._id);
  const stock = product.stock ?? 0;

  const handleIncrease = () => {
    if (quantity < stock) {
      addItem(product);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      removeItem(product._id);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={quantity <= 0}
        aria-label="Decrease quantity"
        className="flex h-7 w-7 items-center justify-center rounded border border-gray-300 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>

      <span className="min-w-5 text-center font-medium">
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrease}
        disabled={quantity >= stock}
        aria-label="Increase quantity"
        className="flex h-7 w-7 items-center justify-center rounded border border-gray-300 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
