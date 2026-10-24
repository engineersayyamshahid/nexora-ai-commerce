"use client";

import React, { useEffect, useState } from "react";
import HomeTabBar from "./HomeTabBar";
import { productType } from "@/constants/data";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Star, ShoppingBag, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NoProductAvailable from "./NoPruductAvailable";
import AddToWishlistButton from "./AddToWishlistButton";

export interface Product {
  _id: string;
  name?: string;
  title?: string;
  slug?: { current: string };
  image?: any;
  price?: number;
  previousPrice?: number;
  stock?: number;
  variant?: string;
  categories?: string[];
}

function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTab, setSelectedTab] = useState(
    productType[0]?.title || ""
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      setLoading(true);
      setError("");

      try {
        // Updated query to fetch image, price, stock, slug, etc.
        const query = `*[_type == "product"] | order(_createdAt desc) {
          _id,
          name,
          title,
          slug,
          image,
          price,
          previousPrice,
          stock,
          variant,
          "categories": categories[]->title
        }`;

        const data = await client.fetch<Product[]>(query);

        if (!isMounted) return;

        const filteredProducts = selectedTab
          ? data.filter(
              (product) =>
                product.variant?.trim().toLowerCase() ===
                selectedTab.trim().toLowerCase()
            )
          : data;

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
      <HomeTabBar
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
      />

      {loading ? (
        <div className="mt-10 flex min-h-80 w-full flex-col items-center justify-center gap-4 bg-gray-50 py-10 rounded-lg">
          <div className="flex items-center space-x-2 text-shop_dark_green">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="font-medium">Products are loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="py-10 text-center">
          <p className="text-red-500 font-semibold">Failed to load products.</p>
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
              <motion.article
                key={product._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges & Wishlist */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1 bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-medium">
                      <Flame className="w-3.5 h-3.5" /> Hot
                    </span>
                    <AddToWishlistButton product={product} />
                  </div>

                  {/* Product Image */}
                  <div className="relative w-full h-40 mb-3 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                    {product.image ? (
                      <Image
                        src={urlFor(product.image).url()}
                        alt={product.name || product.title || "Product image"}
                        fill
                        className="object-contain object-center group-hover:scale-105 transition-transform duration-300 p-2"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No Image</span>
                    )}
                  </div>

                  {/* Categories */}
                  {!!product.categories?.length && (
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      {product.categories.join(", ")}
                    </p>
                  )}

                  {/* Title */}
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-2 group-hover:text-shop_dark_green transition-colors">
                    {product.name || product.title || "Untitled product"}
                  </h3>

                  {/* Rating / Reviews Placeholder */}
                  <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">(5 Reviews)</span>
                  </div>

                  {/* Stock Status */}
                  <p className="text-xs text-gray-600 mb-2">
                    In Stock <span className="font-semibold text-gray-800">{product.stock ?? 10}</span>
                  </p>
                </div>

                <div>
                  {/* Pricing */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base font-bold text-gray-900">
                      ${product.price?.toFixed(2) ?? "0.00"}
                    </span>
                    {product.previousPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ${product.previousPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-full flex items-center justify-center gap-2 bg-shop_dark_green text-white text-xs font-semibold py-2.5 px-4 rounded-lg hover:bg-shop_light_green hoverEffect">
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </section>
  );
}

export default ProductGrid;



// "use client";

// import React, { useEffect, useState } from "react";
// import HomeTabBar from "./HomeTabBar";
// import { productType } from "@/constants/data";
// import { client } from "@/sanity/lib/client";
// import { motion, AnimatePresence } from "motion/react";
// import { Loader2 } from "lucide-react";
// import NoProductAvailable from "./NoPruductAvailable";

// interface Product {
//   _id: string;
//   name?: string;
//   title?: string;
//   variant?: string;
//   categories?: string[];
// }

// function ProductGrid() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedTab, setSelectedTab] = useState(
//     productType[0]?.title || ""
//   );

//   useEffect(() => {
//     let isMounted = true;

//     async function fetchProducts() {
//       setLoading(true);
//       setError("");

//       try {
//         const query = `*[_type == "product"] | order(_createdAt desc) {
//           _id,
//           name,
//           title,
//           variant,
//           "categories": categories[]->title
//         }`;

//         const data = await client.fetch<Product[]>(query);

//         console.log("Sanity products:", data);
//         console.log("Selected tab:", selectedTab);

//         if (!isMounted) return;

//         const filteredProducts = selectedTab
//           ? data.filter(
//               (product) =>
//                 product.variant?.trim().toLowerCase() ===
//                 selectedTab.trim().toLowerCase()
//             )
//           : data;

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
//     <section>
//       <HomeTabBar
//         selectedTab={selectedTab}
//         onTabSelect={setSelectedTab}
//       />

//       {loading ? (
//         <div className="mt-10 flex min-h-80 w-full flex-col items-center justify-center gap-4 bg-gray-100 py-10">
//           <div className="flex items-center space-x-2 text-blue-600">
//             <Loader2 className="h-6 w-5 animate-spin" />
//             <span>Products are loading...</span>
//           </div>
//         </div>
//       ) : error ? (
//         <div className="py-10 text-center">
//           <p className="text-red-500">
//             Failed to load products.
//           </p>
//           <p className="mt-2 text-sm text-gray-500">
//             {error}
//           </p>
//         </div>
//       ) : products.length > 0 ? (
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={selectedTab}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="grid grid-cols-2 gap-2.5 py-6 md:grid-cols-3 lg:grid-cols-5"
//           >
//             {products.map((product) => (
//               <motion.article
//                 key={product._id}
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.25 }}
//                 className="rounded-lg border border-shop_light_green/20 p-4"
//               >
//                 <h3 className="font-semibold">
//                   {product.name ||
//                     product.title ||
//                     "Untitled product"}
//                 </h3>

//                 {!!product.categories?.length && (
//                   <p className="mt-2 text-sm text-gray-500">
//                     {product.categories.join(", ")}
//                   </p>
//                 )}
//               </motion.article>
//             ))}
//           </motion.div>
//         </AnimatePresence>
//       ) : (
//         <NoProductAvailable selectedTab={selectedTab} />
//       )}
//     </section>
//   );
// }

// export default ProductGrid;