"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import { Heart } from "lucide-react";
import React, { useState } from "react";

const AddToWishlistButton = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    // Add your wishlist state/Zustand/localStorage management here
  };

  return (
    <button
      type="button"
      onClick={handleWishlistClick}
      aria-label="Add to wishlist"
      className={cn("absolute top-3 right-3 z-30 cursor-pointer", className)}
    >
      <div
        className={cn(
          "flex items-center justify-center p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:scale-110",
          isLiked
            ? "text-red-500 bg-red-50"
            : "text-gray-600 hover:bg-shop_dark_green hover:text-white"
        )}
      >
        <Heart size={16} className={cn(isLiked && "fill-current")} />
      </div>
    </button>
  );
};

export default AddToWishlistButton;

// import { cn } from "@/lib/utils";
// import { Product } from "../../sanity.types";
// import { Heart } from "lucide-react";
// import React from "react";

// const AddToWishlistButton = ({
//   product,
//   className,
// }: {
//   product: Product;
//   className?: string;
// }) => {
//   return (
//     <div className={cn("absolute top-2 right-2 z-10", className)}>
//       <div className="p-2.5 rounded-full hover:bg-shop_dark_green hover:text-white hoverEffect ">
//         <Heart size={15} />
//       </div>
//     </div>
//   );
// };

// export default AddToWishlistButton;