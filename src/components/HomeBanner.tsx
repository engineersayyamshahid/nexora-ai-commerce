import React from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import { banner_1 } from "@/images";
import Image from "next/image";

const HomeBanner = () => {
  return (
    <div
      className="
        bg-shop_light_pink
        dark:bg-[#161920]
        border border-transparent
        dark:border-zinc-800
        rounded-lg
        mt-1
        px-5 sm:px-8 md:px-10 lg:px-24
        py-10 sm:py-12 md:py-0
        min-h-87.5
        md:min-h-87.5
        flex flex-col md:flex-row
        items-center
        justify-between
        gap-8 md:gap-4
        overflow-hidden
        transition-colors
        duration-300
      "
    >
      {/* Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <Title className="text-gray-900 dark:text-gray-100">
          Grab Upto 50% off on <br className="hidden sm:block" />
          Selected Headphone
        </Title>

        <Link
          href="/shop"
          className="
            inline-block
            mt-6
            bg-shop_dark_green/90
            dark:bg-shop_light_green
            text-white/90
            px-5 py-2.5
            rounded-md
            text-sm
            font-semibold
            hover:text-white
            hover:bg-shop_dark_green
            dark:hover:bg-shop_light_green/90
            hoverEffect
          "
        >
          Buy Now
        </Link>
      </div>

      {/* Image */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <Image
          src={banner_1}
          alt="Selected headphones"
          className="
            w-56
            sm:w-64
            md:w-72
            lg:w-75
            h-auto
            object-contain
          "
          priority
        />
      </div>
    </div>
  );
};

export default HomeBanner;



// import React from "react";
// import { Title } from "./ui/text";
// import Link from "next/link";
// import { banner_1 } from "@/images";
// import Image from "next/image";

// const HomeBanner = () => {
//   return (
//     <div
//       className="
//         bg-shop_light_pink
//         rounded-lg
//         mt-1
//         px-5 sm:px-8 md:px-10 lg:px-24
//         py-10 sm:py-12 md:py-0
//         min-h-87.5
//         md:min-h-87.5
//         flex flex-col md:flex-row
//         items-center
//         justify-between
//         gap-8 md:gap-4
//         overflow-hidden
//       "
//     >
//       {/* Content */}
//       <div className="w-full  md:w-1/2 text-center md:text-left">
//         <Title>
//           Grab Upto 50% off on <br className="hidden sm:block" />
//           Selected Headphone
//         </Title>

//         <Link
//           href="/shop"
//           className="
//             inline-block
//             mt-6
//             bg-shop_dark_green/90
//             text-white/90
//             px-5 py-2.5
//             rounded-md
//             text-sm
//             font-semibold
//             hover:text-white
//             hover:bg-shop_dark_green
//             hoverEffect
//           "
//         >
//           Buy Now
//         </Link>
//       </div>

//       {/* Image */}
//       <div className="w-full md:w-1/2 flex justify-center md:justify-end">
//         <Image
//           src={banner_1}
//           alt="Selected headphones"
//           className="
//             w-56
//             sm:w-64
//             md:w-72
//             lg:w-75
//             h-auto
//             object-contain
//           "
//           priority
//         />
//       </div>
//     </div>
//   );
// };

// export default HomeBanner;

