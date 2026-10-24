
import React from "react";
import { productType } from "@/constants/data";
import Link from "next/link";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}


function HomeTabBar({ selectedTab, onTabSelect }: Props) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-5">
      <div className="flex items-center gap-3 text-sm font-semibold flex-wrap">
        {productType?.map((item) => {
          const isSelected = selectedTab === item?.title;

          return (
            <button
              key={item?.title}
              type="button"
              onClick={() => onTabSelect(item?.title)}
              className={`border px-4 py-1.5 md:px-6 md:py-2 rounded-full transition-all duration-300 ease-in-out hoverEffect ${
                isSelected
                  ? "bg-shop_light_green text-white border-shop_light_green shadow-md shadow-shop_light_green/20"
                  : "bg-shop_light_green/10 text-shop_dark_green border-shop_light_green/20 hover:bg-shop_light_green hover:text-white hover:border-shop_light_green"
              }`}
            >
              {item?.title}
            </button>
          );
        })}
      </div>

      <Link
        href="/shop"
        className="border border-shop_light_green/30 bg-shop_light_green/10 text-shop_dark_green px-4 py-1.5 md:px-6 md:py-2 rounded-full font-semibold transition-all duration-300 hover:bg-shop_light_green hover:border-shop_light_green hover:text-white hoverEffect"
      >
        See all
      </Link>
    </div>
  );
}

export default HomeTabBar;

