"use client";

import React from "react";
import Title from "./Title";
import { Category } from "../sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import useDictionary from "@/hooks/useDictionary";

const HomeCategories = ({ categories }: { categories: Category[] }) => {
  const dict = useDictionary();
  const shopDict = dict?.shop as Record<string, string> | undefined;

  return (
    <div className="bg-white dark:bg-[#12141a] border border-shop_light_green/20 dark:border-zinc-800 my-10 md:my-0 p-5 lg:p-7 rounded-2xl shadow-sm transition-colors">
      {/* Title */} 
      <Title className="border-b border-gray-100 dark:border-zinc-800 pb-3 text-shop_dark_green dark:text-shop_light_green">
        {shopDict?.popularCategories || "Popular Categories"}
      </Title>

      {/* Categories Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories?.map((category) => (
          <div
            key={category?._id}
            className="bg-shop_light_bg/60 dark:bg-zinc-900/60 border border-transparent dark:border-zinc-800/80 p-4 rounded-xl flex items-center gap-4 group hover:border-shop_light_green/40 dark:hover:border-shop_light_green/50 hover:shadow-md transition-all duration-300"
          >
            {/* Category Image Box */}
            {category?.image && (
              <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-700 group-hover:border-shop_light_green hoverEffect w-20 h-20 shrink-0 bg-white dark:bg-zinc-800 p-1">
                <Link href={`/category/${category?.slug?.current}`}>
                  <Image
                    src={urlFor(category?.image).url()}
                    alt="categoryImage"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain group-hover:scale-110 hoverEffect"
                  />
                </Link>
              </div>
            )}

            {/* Category Details */}
            <div className="space-y-1">
              <Link href={`/category/${category?.slug?.current}`}>
                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-shop_light_green hoverEffect line-clamp-1">
                  {category?.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-bold text-shop_dark_green dark:text-shop_light_green">
                  {`(${category?.productCount || 0})`}
                </span>{" "}
                {shopDict?.itemsAvailable || "items Available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;