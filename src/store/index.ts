
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "../../sanity.types";

interface StoreState {
  items: Product[];
  favoriteProduct: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  getItemCount: (productId: string) => number;
  addToFavorite: (product: Product) => Promise<void>;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      items: [],
      favoriteProduct: [],

      addItem: (product) => {
        set((state) => ({
          items: [...state.items, product],
        }));
      },

      removeItem: (productId) => {
        set((state) => {
          const index = state.items.findIndex(
            (item) => item._id === productId
          );

          if (index === -1) return state;

          return {
            items: state.items.filter((_, i) => i !== index),
          };
        });
      },

      getItemCount: (productId) =>
        get().items.filter((item) => item._id === productId).length,

      addToFavorite: async (product) => {
        set((state) => {
          const exists = state.favoriteProduct.some(
            (item) => item._id === product._id
          );

          return {
            favoriteProduct: exists
              ? state.favoriteProduct.filter(
                  (item) => item._id !== product._id
                )
              : [...state.favoriteProduct, product],
          };
        });
      },
    }),
    {
      name: "venzaro-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        favoriteProduct: state.favoriteProduct,
      }),
    }
  )
);

export default useStore;
