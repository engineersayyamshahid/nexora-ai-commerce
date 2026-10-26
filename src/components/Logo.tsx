import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  spanDesign?: string;
}

const Logo = ({ className, spanDesign }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-1.5 sm:gap-2 group shrink-0",
        className
      )}
    >
      {/* Dynamic Logo Image: Inverts/adjusts brightness seamlessly in Dark Mode */}
      <div className="relative shrink-0">
        <Image
          src="/logo.png"
          alt="Nexora Logo"
          width={72}
          height={72}
          priority
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-15 lg:h-15 object-contain shrink-0 dark:brightness-125 dark:contrast-125 transition-all duration-300"
        />
      </div>

      {/* Brand Name: Nexora */}
      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl font-black tracking-wider uppercase text-shop_dark_green dark:text-shop_light_green hover:text-shop_light_green dark:hover:text-white hoverEffect font-sans whitespace-nowrap",
          className
        )}
      >
        Nexor
        <span
          className={cn(
            "text-shop_light_green dark:text-white group-hover:text-shop_dark_green dark:group-hover:text-shop_light_green hoverEffect",
            spanDesign
          )}
        >
          a
        </span>
      </h2>
    </Link>
  );
};

export default Logo;
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { cn } from "@/lib/utils";

// interface LogoProps {
//   className?: string;
//   spanDesign?: string;
// }

// const Logo = ({ className, spanDesign }: LogoProps) => {
//   return (
//     <Link
//       href="/"
//       className={cn(
//         "flex items-center gap-1.5 sm:gap-2 group shrink-0",
//         className
//       )}
//     >
//       <Image
//         src="/logo.png"
//         alt="Venzaro Logo"
//         width={72}
//         height={72}
//         priority
//         className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-15 lg:h-15 object-contain shrink-0"
//       />

//       <h2
//         className={cn(
//           "text-2xl sm:text-3xl md:text-4xl font-black tracking-wider uppercase text-shop_dark_green dark:text-shop_light_green hover:text-shop_light_green dark:hover:text-white hoverEffect font-sans whitespace-nowrap",
//           className
//         )}
//       >
//         Nexor
//         <span
//           className={cn(
//             "text-shop_light_green dark:text-white group-hover:text-shop_dark_green dark:group-hover:text-shop_light_green hoverEffect",
//             spanDesign
//           )}
//         >
//           a
//         </span>
//       </h2>
//     </Link>
//   );
// };

// export default Logo;
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { cn } from "@/lib/utils";

// interface LogoProps {
//   className?: string;
//   spanDesign?: string;
// }

// const Logo = ({ className, spanDesign }: LogoProps) => {
//   return (
//     <Link
//       href="/"
//       className={cn(
//         "flex items-center gap-1.5 sm:gap-2 group shrink-0",
//         className
//       )}
//     >
//       <Image
//         src="/logo.png"
//         alt="Venzaro Logo"
//         width={72}
//         height={72}
//         priority
//         className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-15 lg:h-15 object-contain shrink-0"
//       />

//       <h2
//         className={cn(
//           "text-2xl sm:text-3xl md:text-4xl font-black tracking-wider uppercase text-shop_dark_green hover:text-shop_light_green hoverEffect font-sans whitespace-nowrap",
//           className
//         )}
//       >
//         Venzar
//         <span
//           className={cn(
//             "text-shop_light_green group-hover:text-shop_dark_green hoverEffect",
//             spanDesign
//           )}
//         >
//           o
//         </span>
//       </h2>
//     </Link>
//   );
// };

// export default Logo;
