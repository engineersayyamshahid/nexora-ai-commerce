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
  previousPrice?: number;
  stock?: number;
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
    productType[0]?.title || "All Products",
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      setLoading(true);
      setError("");

      try {
        const query = `*[_type == "product"] | order(_createdAt desc) {
          _id,
          name,
          title,
          slug,
          image,
          images,
          mainImage,
          price,
          previousPrice,
          stock,
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
              : "Unable to fetch products from Sanity.",
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
        <div className="mt-10 flex min-h-80 w-full flex-col items-center justify-center gap-4 rounded-lg bg-gray-50 py-10">
          <div className="flex items-center gap-2 text-shop_dark_green">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="font-medium">Products are loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="py-10 text-center">
          <p className="font-semibold text-red-500">Failed to load products.</p>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
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
  const price = product.price ?? 0;
  const previousPrice = product.previousPrice ?? 0;
  const stock = product.stock ?? 9;
  const status = product.status?.trim().toLowerCase() ?? "";

  const isHot = status === "hot";
  const isNew = status === "new";
  const isSale =
    status === "sale" || (previousPrice > price && previousPrice > 0);

  const discount =
    previousPrice > price && previousPrice > 0
      ? Math.round(((previousPrice - price) / previousPrice) * 100)
      : 0;

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
  const reviewsCount = product.reviewsCount ?? 5;

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all hover:shadow-md sm:p-4"
    >
      <div>
        {/* Badges (Top Left) */}
        <div className="absolute left-3 top-3 z-20 flex flex-wrap items-center gap-1.5">
          {isHot && (
            <Link
              href="/deal"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-600 hover:bg-orange-200 transition-colors"
            >
              <Flame className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
              Hot
            </Link>
          )}

          {isSale && (
            <span className="flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-600">
              <Tag className="h-3.5 w-3.5" />
              {discount > 0 ? `Sale! -${discount}%` : "Sale!"}
            </span>
          )}

          {isNew && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
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
          className="relative mb-3 flex h-40 items-center justify-center overflow-hidden rounded-lg bg-shop_light_bg sm:h-48"
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
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <ImageOff className="h-8 w-8" />
              <span className="text-xs">Image unavailable</span>
            </div>
          )}
        </Link>

        {/* Categories */}
        {formattedCategories && (
          <p className="mb-1 line-clamp-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            {formattedCategories}
          </p>
        )}

        {/* Product name */}
        <Link href={productHref}>
          <h3 className="mb-1.5 line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-shop_dark_green">
            {name}
          </h3>
        </Link>

        {/* Star Rating & Reviews */}
        <div className="mb-2 flex items-center gap-1.5">
          <div className="flex items-center text-shop_dark_green">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < rating || 4
                    ? "fill-current text-yellow-400"
                    : "text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">{reviewsCount} Reviews</span>
        </div>

        {/* Stock */}
        <p className="mb-3 text-xs text-gray-600">
          In Stock <span className="font-semibold text-gray-900">{stock}</span>
        </p>
      </div>

      <div>
        {/* Price & Previous Price */}
        <div className="mb-3 flex flex-wrap items-baseline gap-2">
          <span className="text-base font-bold text-gray-900">
            Rs. {price.toLocaleString("en-PK")}
          </span>

          {previousPrice > price && (
            <span className="text-xs text-gray-400 line-through">
              Rs. {previousPrice.toLocaleString("en-PK")}
            </span>
          )}
        </div>

        {/* Add to Cart button */}
        <AddToCartButton
          product={product as any}
          className="w-full rounded-full bg-shop_dark_green hover:bg-shop_dark_green/90 text-white text-xs font-medium py-2"
        />
      </div>
    </motion.article>
  );
}

export default ProductGrid;

// "use client";

// import React, { useEffect, useState } from "react";
// import HomeTabBar from "./HomeTabBar";
// import { productType } from "@/constants/data";
// import { client } from "@/sanity/lib/client";
// import { urlFor } from "@/sanity/lib/image";
// import { motion, AnimatePresence } from "motion/react";
// import {
//   Loader2,
//   Flame,
//   Tag,
//   Sparkles,
//   ImageOff,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import NoProductAvailable from "./NoPruductAvailable";
// import AddToCartButton from "@/components/AddToCartButton";
// import FavouriteButton from "@/components/FavouriteButton";

// interface Product {
//   _id: string;
//   name?: string;
//   title?: string;
//   slug?: { current: string };
//   image?: any;
//   images?: any[];
//   mainImage?: any;
//   price?: number;
//   previousPrice?: number;
//   stock?: number;
//   variant?: string;
//   status?: string;
//   categories?: string[];
// }

// interface ProductCardProps {
//   product: Product;
// }

// function ProductGrid() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedTab, setSelectedTab] = useState(
//     productType[0]?.title || "All Products"
//   );

//   useEffect(() => {
//     let isMounted = true;

//     async function fetchProducts() {
//       setLoading(true);
//       setError("");

//       try {
//         // Supports common image field names.
//         // Confirm these fields exist in your Sanity product schema.
//         const query = `*[_type == "product"] | order(_createdAt desc) {
//           _id,
//           name,
//           title,
//           slug,
//           image,
//           images,
//           mainImage,
//           "displayImage": coalesce(images[0], image, mainImage),
//           price,
//           previousPrice,
//           stock,
//           variant,
//           status,
//           "categories": categories[]->title
//         }`;

//         const data = await client.fetch<Product[]>(query);

//         if (!isMounted) return;

//         const tab = selectedTab.trim().toLowerCase();

//         const isAllProductsTab = [
//           "",
//           "all",
//           "all products",
//           "all categories",
//         ].includes(tab);

//         const filteredProducts = isAllProductsTab
//           ? data
//           : data.filter((product) => {
//               const matchesVariant =
//                 product.variant?.trim().toLowerCase() === tab;

//               const matchesCategory = product.categories?.some(
//                 (category) =>
//                   category.trim().toLowerCase() === tab
//               );

//               return matchesVariant || matchesCategory;
//             });

//         setProducts(filteredProducts);
//       } catch (err) {
//         console.error("Sanity product fetching error:", err);

//         if (isMounted) {
//           setProducts([]);
//           setError(
//             err instanceof Error
//               ? err.message
//               : "Unable to fetch products from Sanity."
//           );
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     }

//     fetchProducts();

//     return () => {
//       isMounted = false;
//     };
//   }, [selectedTab]);

//   return (
//     <section className="py-6">
//       <HomeTabBar
//         selectedTab={selectedTab}
//         onTabSelect={setSelectedTab}
//       />

//       {loading ? (
//         <div className="mt-10 flex min-h-80 w-full flex-col items-center justify-center gap-4 rounded-lg bg-gray-50 py-10">
//           <div className="flex items-center gap-2 text-shop_dark_green">
//             <Loader2 className="h-6 w-6 animate-spin" />
//             <span className="font-medium">
//               Products are loading...
//             </span>
//           </div>
//         </div>
//       ) : error ? (
//         <div className="py-10 text-center">
//           <p className="font-semibold text-red-500">
//             Failed to load products.
//           </p>
//           <p className="mt-2 text-sm text-gray-500">{error}</p>
//         </div>
//       ) : products.length > 0 ? (
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={selectedTab}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="grid grid-cols-2 gap-4 py-6 md:grid-cols-3 lg:grid-cols-5"
//           >
//             {products.map((product) => (
//               <ProductCardItem
//                 key={product._id}
//                 product={product}
//               />
//             ))}
//           </motion.div>
//         </AnimatePresence>
//       ) : (
//         <NoProductAvailable selectedTab={selectedTab} />
//       )}
//     </section>
//   );
// }

// function ProductCardItem({ product }: ProductCardProps) {
//   const [imageError, setImageError] = useState(false);

//   const name = product.name || product.title || "Untitled product";
//   const price = product.price ?? 0;
//   const previousPrice = product.previousPrice ?? 0;
//   const stock = product.stock ?? 0;
//   const status = product.status?.trim().toLowerCase() ?? "";

//   const isHot = status === "hot";
//   const isNew = status === "new";
//   const isSale =
//     status === "sale" ||
//     (previousPrice > price && previousPrice > 0);

//   const discount =
//     previousPrice > price && previousPrice > 0
//       ? Math.round(
//           ((previousPrice - price) / previousPrice) * 100
//         )
//       : 0;

//   const productImage =
//     product.images?.[0] ??
//     product.image ??
//     product.mainImage;

//   let imageUrl = "";

//   try {
//     if (productImage) {
//       imageUrl = urlFor(productImage)
//         .width(800)
//         .height(800)
//         .url();
//     }
//   } catch (err) {
//     console.error("Unable to build product image URL:", err);
//   }

//   const productHref = `/product/${
//     product.slug?.current || product._id
//   }`;

//   return (
//     <motion.article
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       transition={{ duration: 0.25 }}
//       className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all hover:shadow-md sm:p-4"
//     >
//       <div>
//         {/* Hot, Sale and New badges */}
//         <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
//           {isHot && (
//             <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-600">
//               <Flame className="h-3.5 w-3.5" />
//               Hot
//             </span>
//           )}

//           {isSale && (
//             <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
//               <Tag className="h-3.5 w-3.5" />
//               {discount > 0 ? `-${discount}%` : "Sale"}
//             </span>
//           )}

//           {isNew && (
//             <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
//               <Sparkles className="h-3.5 w-3.5" />
//               New
//             </span>
//           )}
//         </div>

//         {/* Wishlist only; no Add to Cart button here */}
//         <div className="absolute right-3 top-3 z-10">
//           <FavouriteButton
//             showProduct
//             product={product as any}
//           />
//         </div>

//         {/* Product image */}
//         <Link
//           href={productHref}
//           className="relative mb-3 flex h-40 items-center justify-center overflow-hidden rounded-lg bg-gray-50 sm:h-48"
//         >
//           {imageUrl && !imageError ? (
//             <Image
//               src={imageUrl}
//               alt={name}
//               fill
//               sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
//               className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
//               onError={() => setImageError(true)}
//             />
//           ) : (
//             <div className="flex flex-col items-center gap-2 text-gray-400">
//               <ImageOff className="h-8 w-8" />
//               <span className="text-xs">
//                 Image unavailable
//               </span>
//             </div>
//           )}
//         </Link>

//         {/* Categories */}
//         {!!product.categories?.length && (
//           <p className="mb-1 line-clamp-1 text-xs uppercase tracking-wider text-gray-400">
//             {product.categories.join(", ")}
//           </p>
//         )}

//         {/* Product name */}
//         <Link href={productHref}>
//           <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-800 transition-colors group-hover:text-shop_dark_green">
//             {name}
//           </h3>
//         </Link>

//         {/* Stock */}
//         <p className="mb-3 text-xs text-gray-600">
//           {stock > 0 ? (
//             <>
//               In stock:{" "}
//               <span className="font-semibold text-green-700">
//                 {stock}
//               </span>
//             </>
//           ) : (
//             <span className="font-semibold text-red-500">
//               Out of stock
//             </span>
//           )}
//         </p>
//       </div>

//       <div>
//         {/* Price */}
//         <div className="mb-3 flex flex-wrap items-center gap-2">
//           <span className="text-base font-bold text-gray-900">
//             ${price.toFixed(2)}
//           </span>

//           {previousPrice > price && (
//             <span className="text-xs text-gray-400 line-through">
//               ${previousPrice.toFixed(2)}
//             </span>
//           )}
//         </div>

//         {/* Exactly one Add to Cart button */}
//         <AddToCartButton
//           product={product as any}
//           className="w-full rounded-lg"
//         />
//       </div>
//     </motion.article>
//   );
// }

// export default ProductGrid;
