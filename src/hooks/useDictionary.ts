"use client";

import { useLanguageContext } from "@/components/Providers";
import en from "@/app/dictionaries/en.json";
import de from "@/app/dictionaries/de.json";
import ar from "@/app/dictionaries/ar.json";
import ur from "@/app/dictionaries/ur.json";
import fr from "@/app/dictionaries/fr.json";
import it from "@/app/dictionaries/it.json";

const dictionaries = {
  en,
  de,
  ar,
  ur,
  fr,
  it,
};

export default function useDictionary() {
  const { language } = useLanguageContext();
  return dictionaries[language as keyof typeof dictionaries] || en;
}