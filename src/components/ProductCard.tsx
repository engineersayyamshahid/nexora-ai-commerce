"use client";

import type { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import { Heart, ShoppingBag, Star, Flame } from "lucide-react";

const ProductCard = ({ product }: { product: Product }) => {
  const image = product.images?.[0];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4 transition-all duration-300 hover:shadow-lg">
      {/* Top Badges & Wishlist */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-1">
        {product.status === "hot" && (
          <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-600">
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            Hot
          </span>
        )}
        {product.status === "sale" && (
          <span className="rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-xs font-medium text-gray-700 shadow-sm">
            Sale!
          </span>
        )}
      </div>

      <button
        aria-label="Add to wishlist"
        className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-1.5 text-gray-600 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 shadow-sm"
      >
        <Heart className="w-4 h-4" />
      </button>

      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-shop_light_bg mb-3">
        {image && (
          <Image
            src={urlFor(image).url()}
            alt={product.name || product.title || "Product image"}
            loading="lazy"
            width={700}
            height={700}
            className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          {/* Categories */}
          {product.categories?.length > 0 && (
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">
              {product.categories
                .map((cat) => (typeof cat === "string" ? cat : cat.title))
                .join(", ")}
            </p>
          )}

          {/* Title */}
          <h3 className="line-clamp-1 font-semibold text-gray-900 group-hover:text-shop_dark_green transition-colors">
            {product.name || product.title || "Untitled product"}
          </h3>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-shop_dark_green">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {product.reviewsCount || 5} Reviews
            </span>
          </div>

          {/* Stock Status */}
          <p className="text-xs text-gray-600 mt-2">
            In Stock <span className="font-semibold text-gray-800">{product.stock ?? 10}</span>
          </p>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.price != null && (
              <span className="font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
            {product.previousPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.previousPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button className="flex items-center gap-1.5 rounded-full bg-shop_dark_green px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-shop_dark_green/90">
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;