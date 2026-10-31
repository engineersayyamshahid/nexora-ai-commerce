import React from "react";
import Title from "./Title";
import { getLatestBlogs } from "@/sanity/queries/querie";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Calendar, ArrowRight, Flame, User } from "lucide-react";
import dayjs from "dayjs";

const LatestBlog = async () => {
  const blogs = await getLatestBlogs();

  return (
    <section className="mb-16 lg:mb-28">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-shop_dark_green dark:text-shop_light_green uppercase tracking-wider mb-1">
            <Flame size={14} /> Freshly Published
          </div>
          <Title>Latest Blog & Insights</Title>
        </div>
        <Link
          href="/blog"
          className="group hidden md:inline-flex items-center gap-2 text-sm font-semibold text-shop_dark_green dark:text-shop_light_green transition-colors hover:opacity-80"
        >
          View All Posts 
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {!blogs || blogs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-zinc-800 p-8 text-center bg-gray-50/50 dark:bg-[#161920]/50">
          <p className="text-gray-500 dark:text-gray-400">
            No latest blog posts found. Make sure some blogs have `isLatest` set to true in Sanity.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {blogs.map((blog) => {
            const slug = blog?.slug?.current;

            return (
              <article
                key={blog._id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-zinc-800 dark:bg-[#161920] hover:border-shop_dark_green/50 dark:hover:border-shop_light_green/50"
              >
                {/* Image */}
                {blog.mainImage && (
                  <Link href={slug ? `/blog/${slug}` : "/blog"} className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-zinc-900">
                    <Image
                      src={urlFor(blog.mainImage).width(800).url()}
                      alt={blog.title || "Blog image"}
                      width={800}
                      height={500}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>
                )}

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    {/* Categories */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs mb-3">
                      {blog.blogcategories?.map((item, index) => (
                        <span
                          key={item?._id || index}
                          className="rounded-full bg-shop_dark_green/10 px-2.5 py-1 font-semibold text-shop_dark_green dark:bg-shop_light_green/10 dark:text-shop_light_green"
                        >
                          {item?.title}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <Link
                      href={slug ? `/blog/${slug}` : "/blog"}
                      className="block line-clamp-2 text-base font-bold tracking-tight text-gray-900 transition-colors group-hover:text-shop_dark_green dark:text-gray-100 dark:group-hover:text-shop_light_green"
                    >
                      {blog.title || "Untitled Blog"}
                    </Link>
                  </div>

                  {/* Author & Date */}
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500 dark:border-zinc-800/80 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      {blog.author?.image ? (
                        <Image
                          src={urlFor(blog.author.image).width(60).url()}
                          alt={blog.author.name || "Author"}
                          width={24}
                          height={24}
                          className="h-6 w-6 rounded-full object-cover"
                        />
                      ) : (
                        <User size={14} className="text-gray-400" />
                      )}
                      <span className="truncate max-w-[90px]">{blog.author?.name || "Author"}</span>
                    </div>

                    {blog.publishedAt && (
                      <p className="flex items-center gap-1">
                        <Calendar size={13} className="text-shop_dark_green dark:text-shop_light_green" />
                        {dayjs(blog.publishedAt).format("MMM D")}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default LatestBlog;