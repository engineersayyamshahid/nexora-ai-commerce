
"use client";

import type { Product } from "../sanity.types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import useStore from "../store/index";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";

interface Props {
  product: Product;
  className?: string;
}

export default function AddToCartButton({
  product,
  className,
}: Props) {
  const { addItem, getItemCount } = useStore();

  const itemCount = getItemCount(product._id);
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (product.stock != null && product.stock > itemCount) {
      addItem(product);

      toast.success(
        `${product.name?.substring(0, 12) ?? "Product"} added successfully!`
      );
    } else {
      toast.error("Cannot add more than available stock");
    }
  };

  return (
    <div className="flex h-12 w-full items-center">
      {itemCount > 0 ? (
        <div className="w-full text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-darkColor/80">
              Quantity
            </span>

            <QuantityButtons product={product} />
          </div>

          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">
              Subtotal
            </span>

            <PriceFormatter
              amount={(product.price ?? 0) * itemCount}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={cn(
            "w-full border border-shop_dark_green/80 bg-shop_dark_green/80 font-semibold tracking-wide text-white shadow-none hover:border-shop_dark_green hover:bg-shop_dark_green hoverEffect",
            className
          )}
        >
          <ShoppingBag className="h-4 w-4" />

          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      )}
    </div>
  );
}
