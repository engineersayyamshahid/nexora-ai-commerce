import { getSingleBlog } from "@/sanity/queries/querie";
import { urlFor } from "@/sanity/lib/image";
import dayjs from "dayjs";
import { Calendar, ChevronLeftIcon, Tag, User, Share2 } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const SingleBlogPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);

  if (!blog) {
    return (
      <div className="py-28 text-center min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-[#090a0f]">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog post not found</h1>
        <p className="mt-2 text-gray-500">The article you are looking for might have been moved or deleted.</p>
        <Link href="/blog" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-shop_dark_green px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90">
          <ChevronLeftIcon size={16} /> Back to All Articles
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen py-12 lg:py-20 bg-white dark:bg-[#090a0f] transition-colors duration-300">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Navigation Back */}
        <Link 
          href="/blog" 
          className="group mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-shop_dark_green dark:hover:text-shop_light_green transition-colors"
        >
          <ChevronLeftIcon size={16} className="transition-transform group-hover:-translate-x-1" /> 
          Back to Blog Archive
        </Link>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {blog.blogcategories?.map((cat) => (
            <span 
              key={cat._id} 
              className="inline-flex items-center gap-1 rounded-full bg-shop_dark_green/10 px-3.5 py-1.5 text-xs font-bold text-shop_dark_green dark:bg-shop_light_green/10 dark:text-shop_light_green shadow-sm"
            >
              <Tag size={12} /> {cat.title}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl leading-tight">
          {blog.title}
        </h1>

        {/* Author & Date Metadata Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6 text-sm dark:border-zinc-800">
          <div className="flex items-center gap-3">
            {blog.author?.image ? (
              <Image
                src={urlFor(blog.author.image).width(120).url()}
                alt={blog.author.name || "Author"}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-shop_dark_green/40 dark:ring-shop_light_green/40 shadow-md"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 shadow-inner">
                <User size={22} />
              </div>
            )}
            <div>
              <p className="text-xs text-gray-400">Written by</p>
              <p className="font-bold text-gray-900 dark:text-gray-100 text-base">
                {blog.author?.name || "Engineer Sayyam Shahid"}
              </p>
            </div>
          </div>

          {blog.publishedAt && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Calendar size={18} className="text-shop_dark_green dark:text-shop_light_green" />
              <span>{dayjs(blog.publishedAt).format("MMMM D, YYYY")}</span>
            </div>
          )}
        </div>

        {/* Main Cover Image */}
        {blog.mainImage && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200/80 shadow-2xl dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900">
            <Image
              src={urlFor(blog.mainImage).width(1200).url()}
              alt={blog.title || "Blog cover"}
              width={1200}
              height={650}
              priority
              className="max-h-[550px] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        )}

        {/* Portable Text Content */}
        <div className="prose prose-lg dark:prose-invert mt-12 max-w-none text-gray-700 dark:text-gray-300 leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 dark:[&>h2]:text-white [&>h2]:mt-10 [&>h2]:mb-4 [&>p]:mb-6">
          {blog.body ? (
            <PortableText value={blog.body} />
          ) : (
            <p className="text-gray-500 italic">No detailed content available for this post yet.</p>
          )}
        </div>

        {/* Footer Return Link */}
        <div className="mt-16 border-t border-gray-200 pt-8 dark:border-zinc-800 flex items-center justify-between">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:border-zinc-800 dark:bg-[#161920] dark:text-gray-200 hover:scale-105"
          >
            <ChevronLeftIcon size={16} /> Explore More Stories
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SingleBlogPage;



// import { getSingleBlog } from "@/sanity/queries/querie";
// import { urlFor } from "@/sanity/lib/image";
// import dayjs from "dayjs";
// import { Calendar, ChevronLeftIcon, Share2, Tag } from "lucide-react";
// import { PortableText } from "next-sanity";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// interface PageProps {
//   params: Promise<{
//     slug: string;
//   }>;
// }

// const SingleBlogPage = async ({ params }: PageProps) => {
//   const { slug } = await params;
//   const blog = await getSingleBlog(slug);

//   if (!blog) {
//     return (
//       <div className="py-28 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog post not found</h1>
//         <p className="mt-2 text-gray-500">The article you are looking for might have been moved or deleted.</p>
//         <Link href="/blog" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-shop_dark_green px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90">
//           <ChevronLeftIcon size={16} /> Back to All Articles
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <article className="min-h-screen py-10 lg:py-16">
//       <div className="container mx-auto max-w-3xl px-4">
//         {/* Navigation Back */}
//         <Link 
//           href="/blog" 
//           className="group mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-shop_dark_green dark:hover:text-shop_light_green transition-colors"
//         >
//           <ChevronLeftIcon size={16} className="transition-transform group-hover:-translate-x-1" /> 
//           Back to Blog Archive
//         </Link>

//         {/* Categories */}
//         <div className="flex flex-wrap items-center gap-2 mb-4">
//           {blog.blogcategories?.map((cat) => (
//             <span 
//               key={cat._id} 
//               className="inline-flex items-center gap-1 rounded-full bg-shop_dark_green/10 px-3 py-1 text-xs font-semibold text-shop_dark_green dark:bg-shop_light_green/10 dark:text-shop_light_green"
//             >
//               <Tag size={12} /> {cat.title}
//             </span>
//           ))}
//         </div>

//         {/* Title */}
//         <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl leading-tight">
//           {blog.title}
//         </h1>

//         {/* Metadata Bar */}
//         <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6 text-sm text-gray-500 dark:border-zinc-800 dark:text-gray-400">
//           {blog.publishedAt && (
//             <div className="flex items-center gap-2">
//               <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 text-shop_dark_green dark:text-shop_light_green">
//                 <Calendar size={18} />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400">Published On</p>
//                 <p className="font-medium text-gray-700 dark:text-gray-200">
//                   {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Main Cover Image */}
//         {blog.mainImage && (
//           <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200/80 shadow-lg dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900">
//             <Image
//               src={urlFor(blog.mainImage).width(1200).url()}
//               alt={blog.title || "Blog cover"}
//               width={1200}
//               height={650}
//               priority
//               className="max-h-[500px] w-full object-cover"
//             />
//           </div>
//         )}

//         {/* Portable Text Content */}
//         <div className="prose prose-lg dark:prose-invert mt-10 max-w-none text-gray-700 dark:text-gray-300 leading-relaxed [&>h2]:font-bold [&>h2]:text-gray-900 dark:[&>h2]:text-white [&>h3]:text-gray-800 dark:[&>h3]:text-gray-100">
//           {blog.body? (
//             <PortableText value={blog.body} />
//           ) : (
//             <p className="text-gray-500 italic">No detailed content available for this post yet.</p>
//           )}
//         </div>

//         {/* Footer Return Link */}
//         <div className="mt-16 border-t border-gray-200 pt-8 dark:border-zinc-800 flex items-center justify-between">
//           <Link 
//             href="/blog" 
//             className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:border-zinc-800 dark:bg-[#161920] dark:text-gray-200"
//           >
//             <ChevronLeftIcon size={16} /> Explore More Stories
//           </Link>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default SingleBlogPage;