
import React from "react";
import Title from "./Title";
import Link from "next/link";
import { getAllBrands } from "@/sanity/queries/querie";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import {
  GitCompareArrows,
  Headset,
  ShieldCheck,
  Truck,
} from "lucide-react";

const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $100",
    icon: <Truck size={45} />,
  },
  {
    title: "Free Return",
    description: "Easy returns on eligible orders",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Customer Support",
    description: "Friendly 24/7 customer support",
    icon: <Headset size={45} />,
  },
  {
    title: "Money Back Guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45} />,
  },
];

const ShopByBrands = async () => {
  const brands = await getAllBrands();

  return (
    <section className="mt-[20px] mb-10 rounded-2xl border border-transparent bg-shop_light_bg p-5 transition-colors duration-300 dark:border-zinc-800/80 dark:bg-[#12141a] lg:mb-20 lg:p-7">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between gap-5 border-b border-gray-200/60 pb-3 dark:border-zinc-800">
        <Title className="dark:text-white">Shop By Brands</Title>

        <Link
          href="/brand"
          className="text-sm font-semibold tracking-wide text-shop_dark_green transition-colors hover:text-shop_btn_dark_green dark:text-shop_light_green dark:hover:text-white"
        >
          View all →
        </Link>
      </div>

      {/* Brand logos */}
      {brands.length > 0 ? (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {brands.map((brand) => (
            <Link
              key={brand._id}
              href={
                brand.slug?.current
                  ? `/brand/${brand.slug.current}`
                  : "/brand"
              }
              aria-label={`Shop ${brand.title}`}
              className="group flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-shop_dark_green/20 dark:border-zinc-800/80 dark:bg-zinc-900 dark:hover:border-shop_light_green/40"
            >
              {brand.image ? (
                <Image
                  src={urlFor(brand.image).url()}
                  alt={brand.title || "Brand logo"}
                  width={250}
                  height={250}
                  className="h-20 w-32 object-contain transition-transform duration-300 group-hover:scale-105 dark:brightness-95 dark:contrast-125"
                />
              ) : (
                <span className="px-2 text-center font-semibold text-gray-700 dark:text-white">
                  {brand.title}
                </span>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-gray-500">
          No brands are available right now.
        </p>
      )}

      {/* Store features */}
      <div className="mt-16 grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-white/60 p-4 py-5 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/60 sm:grid-cols-2 lg:grid-cols-4">
        {extraData.map((item) => (
          <div
            key={item.title}
            className="group flex items-center gap-3 text-gray-500 transition-colors hover:text-shop_light_green dark:text-gray-400 dark:hover:text-shop_light_green"
          >
            <span className="inline-flex shrink-0 text-shop_dark_green transition-transform group-hover:scale-90 dark:text-shop_light_green">
              {item.icon}
            </span>

            <div className="text-sm">
              <p className="font-bold capitalize text-gray-800 dark:text-gray-200">
                {item.title}
              </p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByBrands;
