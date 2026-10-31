import Container from "@/components/Container";
import Title from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import { getAllBlogs } from "@/sanity/queries/querie";
import dayjs from "dayjs";
import { Calendar, Sparkles, User, ArrowRight, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogPage = async () => {
  const blogs = await getAllBlogs();

  return (
    <div className="py-12 lg:py-16 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 dark:from-[#090a0f] dark:via-[#12141c] dark:to-[#090a0f] min-h-screen transition-colors duration-300">
      <Container>
        {/* Header Section with Animation Glow */}
        <div className="relative mb-14 text-center md:text-left overflow-hidden rounded-3xl bg-gradient-to-r from-shop_dark_green/10 via-shop_dark_green/5 to-transparent dark:from-shop_light_green/10 dark:via-shop_light_green/5 p-8 md:p-12 border border-shop_dark_green/20 dark:border-shop_light_green/20 backdrop-blur-md">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-shop_dark_green/10 dark:bg-shop_light_green/10 blur-3xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 rounded-full bg-shop_dark_green/15 px-4 py-1.5 text-xs font-bold text-shop_dark_green dark:bg-shop_light_green/15 dark:text-shop_light_green mb-4 shadow-sm animate-pulse">
            <Sparkles size={15} /> Our Journal & Expert Insights
          </div>
          <Title className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Explore All Stories
          </Title>
          <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
            Discover cutting-edge advice, deep dives, expert horology guides, and tutorials curated by professional engineers and creators.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs?.map((blog) => (
            <div
              key={blog?._id}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-200/80 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-zinc-800/80 dark:bg-[#161920] hover:border-shop_dark_green/50 dark:hover:border-shop_light_green/50"
            >
              {/* Latest Badge */}
              {blog?.isLatest && (
                <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md">
                  <Flame size={13} className="fill-white" /> Latest
                </span>
              )}

              {/* Main Image with Zoom Animation */}
              {blog?.mainImage && (
                <Link href={`/blog/${blog?.slug?.current}`} className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-zinc-900">
                  <Image
                    src={urlFor(blog?.mainImage).url()}
                    alt={blog?.title || "Blog Image"}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
              )}

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  {/* Categories */}
                  <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
                    {blog?.blogcategories?.map((item, index) => (
                      <span key={index} className="font-semibold text-shop_dark_green dark:text-shop_light_green bg-shop_dark_green/10 dark:bg-shop_light_green/10 px-3 py-1 rounded-full transition-colors group-hover:bg-shop_dark_green group-hover:text-white dark:group-hover:bg-shop_light_green dark:group-hover:text-black">
                        {item?.title}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <Link
                    href={`/blog/${blog?.slug?.current}`}
                    className="block line-clamp-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 hover:text-shop_dark_green dark:hover:text-shop_light_green transition-colors leading-snug"
                  >
                    {blog?.title}
                  </Link>
                </div>

                {/* Author & Footer info */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {blog?.author?.image ? (
                      <Image
                        src={urlFor(blog.author.image).width(100).url()}
                        alt={blog.author.name || "Author"}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-shop_dark_green/30 dark:ring-shop_light_green/30"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-zinc-800 text-gray-600 dark:text-gray-300">
                        <User size={14} />
                      </div>
                    )}
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {blog?.author?.name || "Author"}
                    </span>
                  </div>

                  {blog?.publishedAt && (
                    <p className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                      <Calendar size={13} className="text-shop_dark_green dark:text-shop_light_green" />
                      {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-end">
                  <Link
                    href={`/blog/${blog?.slug?.current}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-shop_dark_green dark:text-shop_light_green group-hover:underline"
                  >
                    Read Article <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;





// import Container from "@/components/Container";
// import Title from "@/components/Title";
// import { urlFor } from "@/sanity/lib/image";
// import { getAllBlogs } from "@/sanity/queries/querie";
// import dayjs from "dayjs";
// import { Calendar, Sparkles } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const BlogPage = async () => {
//   const blogs = await getAllBlogs();

//   return (
//     <div className="py-12 lg:py-16">
//       <Container>
//         <div className="mb-10 text-center md:text-left">
//           <div className="inline-flex items-center gap-2 rounded-full bg-shop_dark_green/10 px-3 py-1 text-xs font-semibold text-shop_dark_green dark:bg-shop_light_green/10 dark:text-shop_light_green mb-3">
//             <Sparkles size={14} /> Our Journal
//           </div>
//           <Title>Explore All Stories</Title>
//           <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-xl">
//             Discover the latest news, expert tips, tutorials, and deep dives into our creative universe.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {blogs?.map((blog) => (
//             <div
//               key={blog?._id}
//               className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-200/80 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-zinc-800 dark:bg-[#161920]"
//             >
//               {blog?.mainImage && (
//                 <Link href={`/blog/${blog?.slug?.current}`} className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-zinc-900">
//                   <Image
//                     src={urlFor(blog?.mainImage).url()}
//                     alt={blog?.title || "Blog Image"}
//                     width={600}
//                     height={400}
//                     className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                   />
//                 </Link>
//               )}
//               <div className="flex flex-1 flex-col justify-between p-6">
//                 <div>
//                   <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
//                     {blog?.blogcategories?.map((item, index) => (
//                       <span key={index} className="font-semibold text-shop_dark_green dark:text-shop_light_green bg-shop_dark_green/10 dark:bg-shop_light_green/10 px-2.5 py-1 rounded-full">
//                         {item?.title}
//                       </span>
//                     ))}
//                   </div>
//                   <Link
//                     href={`/blog/${blog?.slug?.current}`}
//                     className="block line-clamp-2 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100 hover:text-shop_dark_green dark:hover:text-shop_light_green transition-colors"
//                   >
//                     {blog?.title}
//                   </Link>
//                 </div>
                
//                 <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500 dark:border-zinc-800 dark:text-gray-400">
//                   {blog?.publishedAt && (
//                     <p className="flex items-center gap-1.5">
//                       <Calendar size={14} className="text-shop_dark_green dark:text-shop_light_green" />
//                       {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
//                     </p>
//                   )}
//                   <span className="font-medium text-shop_dark_green dark:text-shop_light_green group-hover:translate-x-1 transition-transform">
//                     Read Article →
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default BlogPage;