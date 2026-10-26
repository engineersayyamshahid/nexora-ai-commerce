"use client";

import React, { useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguageContext, languages, LanguageCode } from "./Providers";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageContext();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {/* Trigger button - styled to match header inputs/controls */}
        <button
          className="flex items-center gap-2 border border-gray-200 dark:border-zinc-800 rounded-full px-4 py-2 bg-gray-50 dark:bg-[#161920] text-gray-800 dark:text-gray-200 text-xs font-semibold hover:border-shop_light_green/30 hoverEffect transition-all"
          aria-label="Select Language"
        >
          <Globe size={16} className="text-gray-500" />
          <span className="capitalize">{languages[language].flag} {languages[language].name.split(" ")[0]}</span>
          <ChevronDown size={14} className="text-gray-400 group-hover:text-shop_light_green" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        {/* Dropdown Content - styled for dark theme compatibility */}
        <DropdownMenu.Content
          className="min-w-[160px] bg-white dark:bg-[#161920] rounded-xl p-1.5 shadow-xl border border-gray-100 dark:border-zinc-800 z-50 transition-all animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
          sideOffset={8}
          align="end"
        >
          {Object.entries(languages).map(([code, { name, flag }]) => (
            <DropdownMenu.Item
              key={code}
              className="group flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm text-gray-800 dark:text-gray-200 cursor-pointer outline-none hover:bg-shop_light_green/10 dark:hover:bg-shop_light_green/20 focus:bg-shop_light_green/10 focus:ring-1 focus:ring-shop_light_green/50 transition-colors"
              onClick={() => setLanguage(code as LanguageCode)}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{flag}</span>
                <span className={`font-medium ${code === language ? 'text-shop_light_green' : ''}`}>
                  {name}
                </span>
              </div>
              {code === language && (
                <Check size={16} className="text-shop_light_green" />
              )}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Arrow className="fill-white dark:fill-[#161920]" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}