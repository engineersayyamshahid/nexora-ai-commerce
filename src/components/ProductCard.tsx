"use client";

import type { Product } from "../sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Flame,
  Star,
  ImageOff,
} from "lucide-react";

import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import PriceView from "./PriceView";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);

  const rawProduct = product as Product & {
    title?: string;
    previousPrice?: number;
    discount?: number;
  };

  const name = product.name || rawProduct.title || "Untitled product";
  const price = product.price ?? 0;
  const previousPrice = rawProduct.previousPrice ?? 0;
  const stock = product.stock ?? 0;

  const status = String(product.status ?? "").toLowerCase();

  const isHot = status === "hot";
  const isNew = status === "new";

  const isSale =
    status === "sale" ||
    (previousPrice > 0 && previousPrice > price);

  const discount =
    rawProduct.discount ??
    (previousPrice > price && previousPrice > 0
      ? Math.round(((previousPrice - price) / previousPrice) * 100)
      : 0);

  const image = product.images?.[0];

  const imageUrl = image
    ? urlFor(image).width(800).height(800).fit("max").url()
    : null;

  const productData = product as Product & {
    rating?: number;
    reviewsCount?: number;
  };

  const rating = Math.min(
    5,
    Math.max(0, Number(productData.rating ?? 0))
  );

  const reviewsCount = Math.max(
    0,
    Number(productData.reviewsCount ?? 0)
  );

  const categories = (product.categories ?? [])
    .map((category) => {
      if (typeof category === "string") return category;

      return (category as { title?: string; name?: string })?.title || 
             (category as { title?: string; name?: string })?.name || 
             "";
    })
    .filter(Boolean);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-shop_light_green/40 hover:shadow-xl sm:p-4">
      {/* Product badges */}
      <div className="absolute left-5 top-5 z-20 flex flex-wrap gap-1.5">
        {isHot && (
          <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
            <Flame className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
            Hot
          </span>
        )}

        {isSale && (
          <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
            Sale{discount > 0 ? ` -${discount}%` : ""}
          </span>
        )}

        {isNew && (
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            New
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <AddToWishlistButton product={product} />

      {/* Product image */}
      <Link
        href={`/product/${product.slug?.current ?? product._id}`}
        aria-label={`View ${name}`}
        className="block"
      >
        <div className="relative mb-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-shop_light_bg">
          {imageUrl && !imageError ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              unoptimized
              onError={() => setImageError(true)}
              className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <ImageOff className="h-10 w-10" />
              <span className="text-xs">Image unavailable</span>
            </div>
          )}
        </div>
      </Link>

      {/* Product information */}
      <div className="flex flex-1 flex-col">
        {categories.length > 0 && (
          <p className="mb-1 line-clamp-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400 sm:text-xs">
            {categories.join(", ")}
          </p>
        )}

        <Link href={`/product/${product.slug?.current ?? product._id}`}>
          <h3 className="line-clamp-2 min-h-10 font-semibold text-gray-900 transition-colors group-hover:text-shop_dark_green">
            {name}
          </h3>
        </Link>

        {/* Rating and Reviews */}
        {rating > 0 && (
          <div className="mt-2 flex items-center gap-1.5">
            <div className="flex items-center text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3.5 w-3.5 ${
                    star <= rating ? "fill-current" : "text-gray-200"
                  }`}
                />
              ))}
            </div>

            {reviewsCount > 0 && (
              <span className="text-xs text-gray-500">
                {reviewsCount} Reviews
              </span>
            )}
          </div>
        )}

        {/* Stock */}
        <p className="mt-2 text-xs text-gray-600">
          {stock > 0 ? (
            <>
              In Stock <span className="font-semibold text-emerald-600">{stock}</span>
            </>
          ) : (
            <span className="text-red-600">Out of stock</span>
          )}
        </p>

        {/* Price View Component (Handles both current and previous prices cleanly) */}
        <div className="mt-3">
          <PriceView price={price} previousPrice={previousPrice} />
        </div>

        {/* Add-to-cart component */}
        <div className="mt-auto pt-4">
          <AddToCartButton
            product={product}
            className="h-10 rounded-full text-xs sm:text-sm"
          />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;



// "use client";

// import type { Product } from "../../sanity.types";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import {
//   Flame,
//   ShoppingBag,
//   Star,
//   ImageOff,
// } from "lucide-react";

// import AddToCartButton from "@/components/AddToCartButton";
// import AddToWishlistButton from "@/components/AddToWishlistButton";
// import PriceView from "./PriceView";

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//   const [imageError, setImageError] = useState(false);

//   // Cast product / access properties safely to satisfy TypeScript
//   const rawProduct = product as Product & {
//     title?: string;
//     previousPrice?: number;
//   };

//   const name = product.name || rawProduct.title || "Untitled product";
//   const price = product.price ?? 0;
//   const previousPrice = rawProduct.previousPrice ?? 0;
//   const stock = product.stock ?? 0;

//   const status = String(product.status ?? "").toLowerCase();

//   const isHot = status === "hot";
//   const isNew = status === "new";

//   const isSale =
//     status === "sale" ||
//     (previousPrice > 0 && previousPrice > price);

//   const discount =
//     previousPrice > price && previousPrice > 0
//       ? Math.round(((previousPrice - price) / previousPrice) * 100)
//       : 0;

//   const image = product.images?.[0];

//   const imageUrl = image
//     ? urlFor(image).width(800).height(800).fit("max").url()
//     : null;

//   // Use only real review data when available.
//   const productData = product as Product & {
//     rating?: number;
//     reviewsCount?: number;
//   };

//   const rating = Math.min(
//     5,
//     Math.max(0, Number(productData.rating ?? 0))
//   );

//   const reviewsCount = Math.max(
//     0,
//     Number(productData.reviewsCount ?? 0)
//   );

//   const categories = (product.categories ?? [])
//     .map((category) => {
//       if (typeof category === "string") return category;

//       return (category as { title?: string; name?: string })?.title || 
//              (category as { title?: string; name?: string })?.name || 
//              "";
//     })
//     .filter(Boolean);

//   return (
//     <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-shop_light_green/40 hover:shadow-xl sm:p-4">
//       {/* Product badges */}
//       <div className="absolute left-5 top-5 z-20 flex flex-wrap gap-1.5">
//         {isHot && (
//           <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
//             <Flame className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
//             Hot
//           </span>
//         )}

//         {isSale && (
//           <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
//             Sale{discount > 0 ? ` -${discount}%` : ""}
//           </span>
//         )}

//         {isNew && (
//           <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
//             New
//           </span>
//         )}
//       </div>

//       {/* Wishlist Button */}
//       <AddToWishlistButton product={product} />

//       {/* Product image */}
//       <Link
//         href={`/product/${product.slug?.current ?? product._id}`}
//         aria-label={`View ${name}`}
//         className="block"
//       >
//         <div className="relative mb-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-shop_light_bg">
//           {imageUrl && !imageError ? (
//             <Image
//               src={imageUrl}
//               alt={name}
//               fill
//               sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
//               unoptimized
//               onError={() => setImageError(true)}
//               className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
//             />
//           ) : (
//             <div className="flex flex-col items-center gap-2 text-gray-400">
//               <ImageOff className="h-10 w-10" />
//               <span className="text-xs">Image unavailable</span>
//             </div>
//           )}
//         </div>
//       </Link>

//       {/* Product information */}
//       <div className="flex flex-1 flex-col">
//         {categories.length > 0 && (
//           <p className="mb-1 line-clamp-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400 sm:text-xs">
//             {categories.join(", ")}
//           </p>
//         )}

//         <Link href={`/product/${product.slug?.current ?? product._id}`}>
//           <h3 className="line-clamp-2 min-h-10 font-semibold text-gray-900 transition-colors group-hover:text-shop_dark_green">
//             {name}
//           </h3>
//         </Link>

//         {/* Actual rating data only */}
//         {rating > 0 && (
//           <div className="mt-2 flex items-center gap-1.5">
//             <div className="flex items-center text-amber-400">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                   key={star}
//                   className={`h-3.5 w-3.5 ${
//                     star <= rating ? "fill-current" : "text-gray-200"
//                   }`}
//                 />
//               ))}
//             </div>

//             {reviewsCount > 0 && (
//               <span className="text-xs text-gray-500">
//                 ({reviewsCount})
//               </span>
//             )}
//           </div>
//         )}

//         {/* Stock */}
//         <p
//           className={`mt-2 text-xs ${
//             stock > 0 ? "text-emerald-700" : "text-red-600"
//           }`}
//         >
//           {stock > 0 ? (
//             <>
//               In stock: <span className="font-semibold">{stock}</span>
//             </>
//           ) : (
//             "Out of stock"
//           )}
//         </p>

//         <PriceView price={product?.price} discount={product?.discount} className="text-sm"/>

//         {/* Price */}
//         <div className="mt-3 flex flex-wrap items-baseline gap-2">
//           <span className="text-lg font-bold text-gray-900">
//             ${price.toFixed(2)}
//           </span>

//           {previousPrice > price && (
//             <span className="text-sm text-gray-400 line-through">
//               ${previousPrice.toFixed(2)}
//             </span>
//           )}
//         </div>

//         {/* ONE add-to-cart component */}
//         <div className="mt-auto pt-4">
//           <AddToCartButton
//             product={product}
//             className="h-10 rounded-full text-xs sm:text-sm"
//           />
//         </div>
//       </div>
//     </article>
//   );
// };

// export default ProductCard;



