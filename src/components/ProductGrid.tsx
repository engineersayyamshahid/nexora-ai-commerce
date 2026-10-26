"use client";

import React, { useEffect, useState } from "react";
import HomeTabBar from "./HomeTabBar";
import { productType } from "@/constants/data";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Flame, Tag, Sparkles, ImageOff, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NoProductAvailable from "./NoPruductAvailable";
import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton";

interface Product {
  _id: string;
  name?: string;
  title?: string;
  slug?: { current: string };
  image?: any;
  images?: any[];
  mainImage?: any;
  price?: number;
  regularPrice?: number;
  previousPrice?: number;
  discount?: number;
  discountPercentage?: number;
  stock?: number;
  countInStock?: number;
  inventory?: number;
  variant?: string;
  status?: string;
  categories?: any[];
  rating?: number;
  reviewsCount?: number;
}

interface ProductCardProps {
  product: Product;
}

function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTab, setSelectedTab] = useState(
    productType[0]?.title || "All Products"
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      setLoading(true);
      setError("");

      try {
        // Added discount and discountPercentage to the GROQ query
        const query = `*[_type == "product"] | order(_createdAt desc) {
          _id,
          name,
          title,
          slug,
          image,
          images,
          mainImage,
          price,
          regularPrice,
          previousPrice,
          discount,
          discountPercentage,
          stock,
          countInStock,
          inventory,
          variant,
          status,
          rating,
          reviewsCount,
          "categories": categories[]->{title, name}
        }`;

        const data = await client.fetch<Product[]>(query);

        if (!isMounted) return;

        const tab = selectedTab.trim().toLowerCase();

        const isAllProductsTab = [
          "",
          "all",
          "all products",
          "all categories",
        ].includes(tab);

        const filteredProducts = isAllProductsTab
          ? data
          : data.filter((product) => {
              const matchesVariant =
                product.variant?.trim().toLowerCase() === tab;

              const matchesCategory = product.categories?.some((cat) => {
                const catTitle =
                  typeof cat === "string" ? cat : cat?.title || cat?.name || "";
                return catTitle.trim().toLowerCase() === tab;
              });

              return matchesVariant || matchesCategory;
            });

        setProducts(filteredProducts);
      } catch (err) {
        console.error("Sanity product fetching error:", err);

        if (isMounted) {
          setProducts([]);
          setError(
            err instanceof Error
              ? err.message
              : "Unable to fetch products from Sanity."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [selectedTab]);

  return (
    <section className="py-6">
      <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />

      {loading ? (
        <div className="mt-10 flex min-h-80 w-full flex-col items-center justify-center gap-4 rounded-lg bg-gray-50 dark:bg-[#161920] py-10">
          <div className="flex items-center gap-2 text-shop_dark_green dark:text-shop_light_green">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="font-medium">Products are loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="py-10 text-center">
          <p className="font-semibold text-red-500">Failed to load products.</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{error}</p>
        </div>
      ) : products.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-4 py-6 md:grid-cols-3 lg:grid-cols-5"
          >
            {products.map((product) => (
              <ProductCardItem key={product._id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </section>
  );
}

function ProductCardItem({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const name = product.name || product.title || "Untitled product";
  const price = product.price ?? product.regularPrice ?? 0;
  
  // Get discount value from Sanity schema fields
  const discountVal = product.discount ?? product.discountPercentage ?? 0;
  
  // Calculate previous/original price using your formula: price + (discount * price) / 100
  const previousPrice =
    product.previousPrice ??
    (discountVal > 0 ? price + (discountVal * price) / 100 : 0);

  const stock = product.stock ?? product.countInStock ?? product.inventory ?? 0;
  const status = product.status?.trim().toLowerCase() ?? "";

  const isHot = status === "hot";
  const isNew = status === "new";
  const isSale =
    status === "sale" || discountVal > 0 || (previousPrice > price && previousPrice > 0);

  const productImage =
    product.images?.[0] ?? product.image ?? product.mainImage;

  let imageUrl = "";

  try {
    if (productImage) {
      imageUrl = urlFor(productImage).width(800).height(800).url();
    }
  } catch (err) {
    console.error("Unable to build product image URL:", err);
  }

  const productHref = `/product/${product.slug?.current || product._id}`;

  const formattedCategories = (product.categories ?? [])
    .map((cat) => (typeof cat === "string" ? cat : cat?.title || cat?.name))
    .filter(Boolean)
    .join(", ");

  const rating = product.rating ?? 5;
  const reviewsCount = product.reviewsCount ?? 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#161920] p-3 shadow-sm transition-all hover:shadow-md sm:p-4"
    >
      <div>
        {/* Badges (Top Left) */}
        <div className="absolute left-3 top-3 z-20 flex flex-wrap items-center gap-1.5">
          {isHot && (
            <Link
              href="/deal"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 rounded-full bg-orange-100 dark:bg-orange-950/80 px-2.5 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:bg-orange-200 transition-colors"
            >
              <Flame className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
              Hot
            </Link>
          )}

          {isSale && (
            <span className="flex items-center gap-1 rounded-full bg-red-100 dark:bg-red-950/80 px-2.5 py-1 text-xs font-semibold text-red-600 dark:text-red-400">
              <Tag className="h-3.5 w-3.5" />
              {discountVal > 0 ? `Sale! -${discountVal}%` : "Sale!"}
            </span>
          )}

          {isNew && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              New
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <AddToWishlistButton product={product as any} />

        {/* Product image */}
        <Link
          href={productHref}
          className="relative mb-3 flex h-40 items-center justify-center overflow-hidden rounded-lg bg-shop_light_bg dark:bg-zinc-900/60 sm:h-48"
        >
          {imageUrl && !imageError ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
              <ImageOff className="h-8 w-8" />
              <span className="text-xs">Image unavailable</span>
            </div>
          )}
        </Link>

        {/* Categories */}
        {formattedCategories && (
          <p className="mb-1 line-clamp-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            {formattedCategories}
          </p>
        )}

        {/* Product name */}
        <Link href={productHref}>
          <h3 className="mb-1.5 line-clamp-2 text-sm font-semibold text-gray-900 dark:text-gray-100 transition-colors group-hover:text-shop_dark_green">
            {name}
          </h3>
        </Link>

        {/* Star Rating & Reviews */}
        <div className="mb-2 flex items-center gap-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < rating
                    ? "fill-current text-amber-400"
                    : "text-gray-300 dark:text-zinc-700"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {reviewsCount} Reviews
          </span>
        </div>

        {/* Stock */}
        <p className="mb-3 text-xs text-gray-600 dark:text-gray-400">
          In Stock{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {stock}
          </span>
        </p>
      </div>

      <div>
        {/* Price & Line-through Previous/Discount Price */}
        <div className="mb-3 flex flex-wrap items-baseline gap-2">
          <span className="text-base font-bold text-gray-900 dark:text-white">
            Rs. {price.toLocaleString("en-PK")}
          </span>

          {previousPrice > price && (
            <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
              Rs. {previousPrice.toLocaleString("en-PK")}
            </span>
          )}
        </div>

        {/* Add to Cart button */}
        <AddToCartButton
          product={product as any}
          className="w-full rounded-full bg-shop_dark_green dark:bg-shop_light_green hover:bg-shop_dark_green/90 dark:hover:bg-shop_light_green/90 text-white text-xs font-medium py-2 transition-colors"
        />
      </div>
    </motion.article>
  );
}

export default ProductGrid;


