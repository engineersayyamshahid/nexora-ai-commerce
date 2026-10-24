
"use client";

import React, { useEffect, useState } from "react";
import HomeTabBar from "./HomeTabBar";
import { productType } from "@/constants/data";
import { client } from "@/sanity/lib/client";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoPruductAvailable";

interface Product {
  _id: string;
  name?: string;
  title?: string;
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
        const query = `*[_type == "product"] | order(_createdAt desc) {
          _id,
          name,
          title,
          variant,
          "categories": categories[]->title
        }`;

        const data = await client.fetch<Product[]>(query);

        console.log("Sanity products:", data);
        console.log("Selected tab:", selectedTab);

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
    <section>
      <HomeTabBar
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
      />

      {loading ? (
        <div className="mt-10 flex min-h-80 w-full flex-col items-center justify-center gap-4 bg-gray-100 py-10">
          <div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="h-6 w-5 animate-spin" />
            <span>Products are loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="py-10 text-center">
          <p className="text-red-500">
            Failed to load products.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {error}
          </p>
        </div>
      ) : products.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-2.5 py-6 md:grid-cols-3 lg:grid-cols-5"
          >
            {products.map((product) => (
              <motion.article
                key={product._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-lg border border-shop_light_green/20 p-4"
              >
                <h3 className="font-semibold">
                  {product.name ||
                    product.title ||
                    "Untitled product"}
                </h3>

                {!!product.categories?.length && (
                  <p className="mt-2 text-sm text-gray-500">
                    {product.categories.join(", ")}
                  </p>
                )}
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

