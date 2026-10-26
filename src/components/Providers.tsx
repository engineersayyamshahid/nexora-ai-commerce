"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const languages = {
  en: { name: "English", flag: "🇺🇸", dir: "ltr" },
  de: { name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  ar: { name: "العربية", flag: "🇸🇦", dir: "rtl" },
  ur: { name: "اردو", flag: "🇵🇰", dir: "rtl" },
  fr: { name: "Français", flag: "🇫🇷", dir: "ltr" },
  it: { name: "Italiano", flag: "🇮🇹", dir: "ltr" },
};

export type LanguageCode = keyof typeof languages;

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  direction: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  direction: "ltr",
});

export const useLanguageContext = () => useContext(LanguageContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang") as LanguageCode;
    if (savedLang && languages[savedLang]) {
      setLanguageState(savedLang);
      setDirection(languages[savedLang].dir as "ltr" | "rtl");
      document.documentElement.lang = savedLang;
      document.documentElement.dir = languages[savedLang].dir;
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    if (languages[lang]) {
      setLanguageState(lang);
      const newDir = languages[lang].dir as "ltr" | "rtl";
      setDirection(newDir);
      localStorage.setItem("app_lang", lang);
      
      // Dynamically update document html lang and text direction (RTL/LTR)
      document.documentElement.lang = lang;
      document.documentElement.dir = newDir;
    }
  };

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageContext.Provider value={{ language, setLanguage, direction }}>
        {children}
      </LanguageContext.Provider>
    </NextThemesProvider>
  );
}