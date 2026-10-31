
"use client";

import type { Product } from "../sanity.types";
import useStore from "../store/index";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  showProduct?: boolean;
  product?: Product | null;
}

export default function FavouriteButton({
  showProduct = false,
  product,
}: Props) {
  const { favoriteProduct, addToFavorite } = useStore();

  const [existingProduct, setExistingProduct] =
    useState<Product | null>(null);

  useEffect(() => {
    const availableItem = favoriteProduct.find(
      (item) => item?._id === product?._id
    );

    setExistingProduct(availableItem ?? null);
  }, [product, favoriteProduct]);

  const handleFavorite = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product?._id) return;

    addToFavorite(product)
      .then(() => {
        toast.success(
          existingProduct
            ? "Product removed successfully!"
            : "Product added successfully!"
        );
      })
      .catch(() => {
        toast.error("Unable to update favorites");
      });
  };

  if (!showProduct) {
    return (
      <Link href="/wishlist" className="group relative">
        <Heart className="h-5 w-5 hover:text-shop_light_green hoverEffect" />

        <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-shop_dark_green text-xs font-semibold text-white">
          {favoriteProduct?.length ?? 0}
        </span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleFavorite}
      aria-label={
        existingProduct
          ? "Remove from favorites"
          : "Add to favorites"
      }
      className="group relative rounded-sm border border-shop_light_green/80 p-1.5 hover:border-shop_light_green hover:text-shop_light_green hoverEffect"
    >
      <Heart
        className="mt-0.5 h-5 w-5 text-shop_light_green/80 group-hover:text-shop_light_green hoverEffect"
        fill={existingProduct ? "#3b9c3c" : "none"}
      />
    </button>
  );
}
