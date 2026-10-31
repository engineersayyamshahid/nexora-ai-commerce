import { sanityFetch } from "../lib/live";

// 1. Define the GROQ Query for Latest Blogs
const LATEST_BLOG_QUERY = `*[_type == 'blog'] | order(_createdAt desc) [0...4] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  blogcategories[]->{
    title,
    slug
  }
}`;

// 2. Fetch Categories
const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(name asc) [0...$quantity] {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`
      : `*[_type == 'category'] | order(name asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`;

    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });

    return data ?? [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// 3. Fetch Latest Blogs
const getLatestBlogs = async () => {
  try {
    const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching latest blogs:", error);
    return [];
  }
};

// 4. Fetch All Blogs (with optional quantity limit)
const getAllBlogs = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == 'blog'] | order(_createdAt desc) [0...$quantity] {
          _id,
          title,
          slug,
          mainImage,
          publishedAt,
          blogcategories[]->{
            title,
            slug
          }
        }`
      : `*[_type == 'blog'] | order(_createdAt desc) {
          _id,
          title,
          slug,
          mainImage,
          publishedAt,
          blogcategories[]->{
            title,
            slug
          }
        }`;

    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });

    return data ?? [];
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    return [];
  }
};

export { getAllBlogs, getCategories, getLatestBlogs };