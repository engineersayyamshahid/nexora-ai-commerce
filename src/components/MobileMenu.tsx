"use client";

import React, { useState } from "react";
import { AlignLeft } from "lucide-react";
import SideMenu from "./SideMenu";

const MobileMenu = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsSideBarOpen(true)}
        className="md:hidden hover:cursor-pointer"
        aria-label="Open menu"
      >
        <AlignLeft className="w-6 h-6 hover:text-shop_light_green hoverEffect" />
      </button>

      <SideMenu
        isopen={isSideBarOpen}
        onClose={() => setIsSideBarOpen(false)}
      />
    </>
  );
};

export default MobileMenu;

// "use client";
// import React, { useState } from "react";
// import { AlignLeft } from "lucide-react";
// import SideMenu from "./SideMenu";

// const MobileMenu = () => {
//   const [isSideBarOpen, setIsSideBarOpen] = useState(false);
//   return (
//     <>
//       <button onClick={()=> setIsSideBarOpen(!isSideBarOpen)}>
//         <AlignLeft className="hover:text-darkColor hoverEffect md:hidden hover:cursor-pointer md:gap-0 " />
//       </button>
//       <div className="md:hidden">
//         <SideMenu isOpen = {isSideBarOpen}  onClose={()=> setIsSideBarOpen(false)}/>
//       </div>
//     </>
//   );
// };

// export default MobileMenu;
