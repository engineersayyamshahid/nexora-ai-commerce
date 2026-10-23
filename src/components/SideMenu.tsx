"use client";

import React, { FC } from "react";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import Link from "next/link";
import { headerData } from "@/constants/data";
import { useLockBodyScroll } from "@/hooks";

interface SidebarProps {
  isopen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SidebarProps> = ({ isopen, onClose }) => {
  useLockBodyScroll(isopen);

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 h-screen w-72 sm:w-80 bg-black text-white/80 shadow-xl transition-transform duration-500 ${
        isopen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full p-8 sm:p-10 border-r border-r-shop_light_bg flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-5">
          <Logo
            className="text-white"
            spanDesign="group-hover:text-white"
          />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-shop_light_green hoverEffect text-xl"
            aria-label="Close menu"
          >
            X
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {headerData?.map((item) => (
            <Link
              href={item?.href}
              key={item?.title}
              onClick={onClose}
              className="hover:text-shop_light_green hoverEffect"
            >
              {item?.title}
            </Link>
          ))}
        </div>

        {/* Social Media */}
        <SocialMedia />
      </div>
    </div>
  );
};

export default SideMenu;



// import React, { FC } from "react";
// import Logo from "./Logo";
// import SocialMedia from "./SocialMedia";

// interface SidebarProps {
//   isopen: boolean;
//   onClose: () => void;
// }

// const SideMenu: FC<SidebarProps> = ({ isopen, onClose }) => {
//   return (
//     <div
//       className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50 text-white/80 shadow-xl ${
//         isopen ? "translate-x-0" : "-translate-x-full"
//       } hoverEffect`}
//     >
//       <div className="min-w-72 max-w-96 bg-black h-screen p-10 border-r  border-r-shop_light_bg flex flex-col gap-6">
//         <div className="flex items-center justify-between gap-5">
//           <Logo className="text-white" spanDesign="group-hover:text-white"/>
//           <button
//             onClick={onClose}
//             className="hover:text-shop_light_green hoverEffect"
//           >
//             X
//           </button>
//         </div>
//         <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">

//         </div>
//         <SocialMedia/>
//       </div>
//     </div>
//   );
// };

// export default SideMenu;
