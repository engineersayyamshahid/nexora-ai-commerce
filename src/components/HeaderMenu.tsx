"use client";

import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import useDictionary from "@/hooks/useDictionary";

const HeaderMenu = () => {
  const pathname = usePathname();
  const dict = useDictionary();

  return (
    <nav className="hidden md:flex w-full items-center justify-center gap-5 lg:gap-7 text-sm capitalize font-semibold text-lightColor dark:text-gray-300">
      {headerData?.map((item) => {
        const isActive = pathname === item?.href;
        
        // Normalize title to lowercase for reliable dictionary lookup
        const lookupKey = item?.title?.toLowerCase();
        const translatedTitle = 
          dict?.header?.[lookupKey] || 
          dict?.header?.[item?.title] || 
          item?.title;

        return (
          <Link
            key={item?.title}
            href={item?.href}
            className={`relative group whitespace-nowrap hover:text-shop_light_green hoverEffect ${
              isActive ? "text-shop_light_green dark:text-shop_light_green" : ""
            }`}
          >
            {translatedTitle}

            {/* Left underline */}
            <span
              className={`absolute -bottom-0.5 left-1/2 h-0.5 bg-shop_light_green hoverEffect ${
                isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
              }`}
            />

            {/* Right underline */}
            <span
              className={`absolute -bottom-0.5 right-1/2 h-0.5 bg-shop_light_green hoverEffect ${
                isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
};

export default HeaderMenu;


// "use client";

// import { headerData } from "@/constants/data";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";

// const HeaderMenu = () => {
//   const pathname = usePathname();

//   return (
//     <nav className="hidden md:flex w-full items-center justify-center gap-5 lg:gap-7 text-sm capitalize font-semibold text-lightColor dark:text-gray-300">
//       {headerData?.map((item) => {
//         const isActive = pathname === item?.href;

//         return (
//           <Link
//             key={item?.title}
//             href={item?.href}
//             className={`relative group whitespace-nowrap hover:text-shop_light_green hoverEffect ${
//               isActive ? "text-shop_light_green dark:text-shop_light_green" : ""
//             }`}
//           >
//             {item?.title}

//             {/* Left underline */}
//             <span
//               className={`absolute -bottom-0.5 left-1/2 h-0.5 bg-shop_light_green hoverEffect ${
//                 isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
//               }`}
//             />

//             {/* Right underline */}
//             <span
//               className={`absolute -bottom-0.5 right-1/2 h-0.5 bg-shop_light_green hoverEffect ${
//                 isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
//               }`}
//             />
//           </Link>
//         );
//       })}
//     </nav>
//   );
// };

// export default HeaderMenu;




// "use client";

// import { headerData } from "@/constants/data";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";

// const HeaderMenu = () => {
//   const pathname = usePathname();

//   return (
//     <nav className="hidden md:flex w-1/3 items-center justify-center gap-5 lg:gap-7 text-sm capitalize font-semibold text-lightColor">
//       {headerData?.map((item) => {
//         const isActive = pathname === item?.href;

//         return (
//           <Link
//             key={item?.title}
//             href={item?.href}
//             className="relative group whitespace-nowrap hover:text-shop_light_green hoverEffect"
//           >
//             {item?.title}

//             {/* Left underline */}
//             <span
//               className={`absolute -bottom-0.5 left-1/2 h-0.5 bg-shop_light_green hoverEffect ${
//                 isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
//               }`}
//             />

//             {/* Right underline */}
//             <span
//               className={`absolute -bottom-0.5 right-1/2 h-0.5 bg-shop_light_green hoverEffect ${
//                 isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
//               }`}
//             />
//           </Link>
//         );
//       })}
//     </nav>
//   );
// };

// export default HeaderMenu;
