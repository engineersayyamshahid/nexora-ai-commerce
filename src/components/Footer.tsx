"use client";

import Container from "@/components/Container";
import React from "react";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import { quickLinksData, categoriesData } from "@/constants/data";
import Link from "next/link";
import useDictionary from "@/hooks/useDictionary";

const Footer = () => {
  const dict = useDictionary();
  const footerDict = dict?.footer as Record<string, string> | undefined;

  return (
    <footer className="bg-white dark:bg-[#0f1115] border-t border-gray-200 dark:border-zinc-800 mt-20 transition-colors">
      <Container>
        <FooterTop />

        <div className="py-10 sm:py-12 lg:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-center sm:text-left">
          {/* BRAND */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="h-7 flex items-center">
              <div className="scale-90 origin-center sm:origin-left">
                <Logo />
              </div>
            </div>
            <SubText className="mt-7 max-w-xs leading-relaxed text-gray-600 dark:text-gray-400">
              Discover curated furniture collections at Venzaro, blending style and comfort to elevate your living spaces.
            </SubText>
            <div className="mt-5">
              <SocialMedia />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="h-7 flex items-center">
              <SubTitle className="dark:text-gray-100">
                {footerDict?.quickLinks || "Quick Links"}
              </SubTitle>
            </div>
            <ul className="mt-5 space-y-3">
              {quickLinksData?.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-shop_dark_green dark:hover:text-shop_light_green transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CATEGORIES */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="h-7 flex items-center">
              <SubTitle className="dark:text-gray-100">
                {footerDict?.categories || "Categories"}
              </SubTitle>
            </div>
            <ul className="mt-5 space-y-3">
              {categoriesData?.map((item) => (
                <li key={item.title}>
                  <Link href={`/shop/${item.href}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-shop_dark_green dark:hover:text-shop_light_green transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="h-7 flex items-center">
              <SubTitle className="dark:text-gray-100">
                {footerDict?.newsletter || "Newsletter"}
              </SubTitle>
            </div>
            <SubText className="mt-5 max-w-xs leading-relaxed text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter to receive updates and exclusive offers.
            </SubText>
            <form className="mt-5 w-full max-w-sm space-y-3">
              <input
                type="email"
                placeholder={footerDict?.emailPlaceholder || "Enter your email"}
                className="w-full h-11 px-4 rounded-md border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-center sm:text-left outline-none focus:border-shop_dark_green dark:focus:border-shop_light_green transition-colors"
              />
              <button
                type="submit"
                className="w-full h-11 rounded-md bg-shop_dark_green dark:bg-shop_light_green text-white text-sm font-semibold hover:bg-shop_dark_green/90 dark:hover:bg-shop_light_green/90 transition-colors"
              >
                {footerDict?.subscribe || "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-200 dark:border-zinc-800 py-5">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2026{" "}
            <Link href="/" className="font-bold text-shop_dark_green dark:text-shop_light_green hover:underline">
              Venzaro
            </Link>
            . {footerDict?.allRightsReserved || "All Rights Reserved."} |{" "}
            <a href="https://www.linkedin.com/in/sayyam-shahid-939bb135a/" target="_blank" rel="noopener noreferrer" className="font-bold text-shop_dark_green dark:text-shop_light_green hover:underline">
              Sayyam Shahid
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;


// import Container from "@/components/Container";
// import React from "react";
// import FooterTop from "./FooterTop";
// import Logo from "./Logo";
// import SocialMedia from "./SocialMedia";
// import { SubText, SubTitle } from "./ui/text";
// import { quickLinksData, categoriesData } from "@/constants/data";
// import Link from "next/link";

// const Footer = () => {
//   return (
//     <footer className="bg-white dark:bg-[#0f1115] border-t border-gray-200 dark:border-zinc-800 mt-20 transition-colors">
//       <Container>
//         {/* Contact Information */}
//         <FooterTop />

//         {/* Main Footer */}
//         <div
//           className="
//             py-10 sm:py-12 lg:py-14
//             grid
//             grid-cols-1
//             sm:grid-cols-2
//             lg:grid-cols-4
//             gap-10
//             lg:gap-8
//             text-center
//             sm:text-left
//           "
//         >
//           {/* ================= BRAND ================= */}
//           <div className="flex flex-col items-center sm:items-start">
//             <div className="h-7 flex items-center">
//               <div className="scale-90 origin-center sm:origin-left">
//                 <Logo />
//               </div>
//             </div>

//             <SubText className="mt-7 max-w-xs leading-relaxed text-gray-600 dark:text-gray-400">
//               Discover curated furniture collections at Venzaro, blending style
//               and comfort to elevate your living spaces.
//             </SubText>

//             <div className="mt-5">
//               <SocialMedia />
//             </div>
//           </div>

//           {/* ================= QUICK LINKS ================= */}
//           <div className="flex flex-col items-center sm:items-start">
//             <div className="h-7 flex items-center">
//               <SubTitle className="dark:text-gray-100">Quick Links</SubTitle>
//             </div>

//             <ul className="mt-5 space-y-3">
//               {quickLinksData?.map((item) => (
//                 <li key={item.title}>
//                   <Link
//                     href={item.href}
//                     className="
//                       text-sm
//                       text-gray-600
//                       dark:text-gray-400
//                       hover:text-shop_dark_green
//                       dark:hover:text-shop_light_green
//                       transition-colors
//                     "
//                   >
//                     {item.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* ================= CATEGORIES ================= */}
//           <div className="flex flex-col items-center sm:items-start">
//             <div className="h-7 flex items-center">
//               <SubTitle className="dark:text-gray-100">Categories</SubTitle>
//             </div>

//             <ul className="mt-5 space-y-3">
//               {categoriesData?.map((item) => (
//                 <li key={item.title}>
//                   <Link
//                     href={`/shop/${item.href}`}
//                     className="
//                       text-sm
//                       text-gray-600
//                       dark:text-gray-400
//                       hover:text-shop_dark_green
//                       dark:hover:text-shop_light_green
//                       transition-colors
//                     "
//                   >
//                     {item.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* ================= NEWSLETTER ================= */}
//           <div className="flex flex-col items-center sm:items-start">
//             <div className="h-7 flex items-center">
//               <SubTitle className="dark:text-gray-100">Newsletter</SubTitle>
//             </div>

//             <SubText className="mt-5 max-w-xs leading-relaxed text-gray-600 dark:text-gray-400">
//               Subscribe to our newsletter to receive updates and exclusive
//               offers.
//             </SubText>

//             <form className="mt-5 w-full max-w-sm space-y-3">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="
//                   w-full
//                   h-11
//                   px-4
//                   rounded-md
//                   border
//                   border-gray-300
//                   dark:border-zinc-800
//                   bg-white
//                   dark:bg-zinc-900/60
//                   text-sm
//                   text-gray-700
//                   dark:text-gray-200
//                   placeholder:text-gray-400
//                   dark:placeholder:text-gray-500
//                   text-center
//                   sm:text-left
//                   outline-none
//                   focus:border-shop_dark_green
//                   dark:focus:border-shop_light_green
//                   transition-colors
//                 "
//               />

//               <button
//                 type="submit"
//                 className="
//                   w-full
//                   h-11
//                   rounded-md
//                   bg-shop_dark_green
//                   dark:bg-shop_light_green
//                   text-white
//                   text-sm
//                   font-semibold
//                   hover:bg-shop_dark_green/90
//                   dark:hover:bg-shop_light_green/90
//                   transition-colors
//                 "
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* ================= COPYRIGHT ================= */}
//         <div className="border-t border-gray-200 dark:border-zinc-800 py-5">
//           <p className="text-center text-sm text-gray-500 dark:text-gray-400">
//             © 2026{" "}
//             <Link
//               href="/"
//               className="font-bold text-shop_dark_green dark:text-shop_light_green hover:underline"
//             >
//               Venzaro
//             </Link>
//             . All Rights Reserved. |{" "}
//             <a
//               href="https://www.linkedin.com/in/sayyam-shahid-939bb135a/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="font-bold text-shop_dark_green dark:text-shop_light_green hover:underline"
//             >
//               Sayyam Shahid
//             </a>
//           </p>
//         </div>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;


// import Container from "@/components/Container";
// import React from "react";
// import FooterTop from "./FooterTop";
// import Logo from "./Logo";
// import SocialMedia from "./SocialMedia";
// import { SubText, SubTitle } from "./ui/text";
// import { quickLinksData, categoriesData } from "@/constants/data";
// import Link from "next/link";

// const Footer = () => {
//   return (
//     <footer className="bg-white border-t mt-20">
//       <Container>
//         {/* Contact Information */}
//         <FooterTop />

//         {/* Main Footer */}
//         <div
//           className="
//             py-10 sm:py-12 lg:py-14
//             grid
//             grid-cols-1
//             sm:grid-cols-2
//             lg:grid-cols-4
//             gap-10
//             lg:gap-8
//             text-center
//             sm:text-left
//           "
//         >
//           {/* ================= BRAND ================= */}
//           <div className="flex flex-col items-center sm:items-start">
//             <div className="h-7 flex items-center">
//               <div className="scale-90 origin-center sm:origin-left">
//                 <Logo />
//               </div>
//             </div>

//             <SubText className="mt-7 max-w-xs leading-relaxed">
//               Discover curated furniture collections at Venzaro, blending style
//               and comfort to elevate your living spaces.
//             </SubText>

//             <div className="mt-5">
//               <SocialMedia />
//             </div>
//           </div>

//           {/* ================= QUICK LINKS ================= */}
//           <div className="flex flex-col items-center sm:items-start">
//             <div className="h-7 flex items-center">
//               <SubTitle>Quick Links</SubTitle>
//             </div>

//             <ul className="mt-5 space-y-3">
//               {quickLinksData?.map((item) => (
//                 <li key={item.title}>
//                   <Link
//                     href={item.href}
//                     className="
//                       text-sm
//                       text-gray-600
//                       hover:text-shop_dark_green
//                       transition-colors
//                     "
//                   >
//                     {item.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* ================= CATEGORIES ================= */}
//           <div className="flex flex-col items-center sm:items-start">
//             <div className="h-7 flex items-center">
//               <SubTitle>Categories</SubTitle>
//             </div>

//             <ul className="mt-5 space-y-3">
//               {categoriesData?.map((item) => (
//                 <li key={item.title}>
//                   <Link
//                     href={`/shop/${item.href}`}
//                     className="
//                       text-sm
//                       text-gray-600
//                       hover:text-shop_dark_green
//                       transition-colors
//                     "
//                   >
//                     {item.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* ================= NEWSLETTER ================= */}
//           <div className="flex flex-col items-center sm:items-start">
//             <div className="h-7 flex items-center">
//               <SubTitle>Newsletter</SubTitle>
//             </div>

//             <SubText className="mt-5 max-w-xs leading-relaxed">
//               Subscribe to our newsletter to receive updates and exclusive
//               offers.
//             </SubText>

//             <form className="mt-5 w-full max-w-sm space-y-3">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="
//                   w-full
//                   h-11
//                   px-4
//                   rounded-md
//                   border
//                   border-gray-300
//                   text-sm
//                   text-gray-700
//                   text-center
//                   sm:text-left
//                   outline-none
//                   focus:border-shop_dark_green
//                   transition-colors
//                 "
//               />

//               <button
//                 type="submit"
//                 className="
//                   w-full
//                   h-11
//                   rounded-md
//                   bg-shop_dark_green
//                   text-white
//                   text-sm
//                   font-semibold
//                   hover:bg-shop_dark_green/90
//                   transition-colors
//                 "
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* ================= COPYRIGHT ================= */}
//         <div className="border-t py-5">
//           <p className="text-center text-sm text-gray-500">
//             © 2026{" "}
//             <Link
//               href="/"
//               className="font-bold text-shop_dark_green hover:underline"
//             >
//               Venzaro
//             </Link>
       
//             . All Rights Reserved. |{" "}
//             <a
//               href="https://www.linkedin.com/in/sayyam-shahid-939bb135a/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="font-bold text-shop_dark_green hover:underline"
//             >
//               Sayyam Shahid
//             </a>
//           </p>
//         </div>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;
// // import Container from "@/components/Container";
// // import React from "react";
// // import FooterTop from "./FooterTop";
// // import Logo from "./Logo";
// // import SocialMedia from "./SocialMedia";
// // import { SubText, SubTitle } from "./ui/text";
// // import { quickLinksData } from "@/constants/data";
// // import Link from "next/link";

// // const Footer = () => {
// //   return (
// //     <footer className="bg-white border-t">
// //       <Container>
// //         <FooterTop/>
// //         <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
// //           <div className="space-y-4 ">
// //             <Logo />
// //             <SubText>Discover curated furniture collections at Venzaro, blending style and comfort to elevate your living spaces.</SubText>
// //             <SocialMedia/>
// //           </div>
// //           <div>
// //             <SubTitle>
// //               Quick Links
// //               <ul className="space-y-3 mt-4">
// //                 {quickLinksData?.map((item)=>(
// //                   <li key={item?.title}>
// //                     <Link href={item?.href}>
// //                       {item?.title}
// //                     </Link>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </SubTitle>
// //           </div>
// //           <div></div>
// //           <div></div>
// //         </div>
// //       </Container>
// //     </footer>
// //   );
// // };

// // export default Footer;
