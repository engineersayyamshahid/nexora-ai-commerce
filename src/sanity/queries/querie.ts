import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";

// ==================== BRANDS ====================

export const BRANDS_QUERY = defineQuery(`
  *[_type == "brand"] | order(title asc) {
    _id,
    title,
    slug,
    image
  }
`);

export const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({
      query: BRANDS_QUERY,
    });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

// ==================== LATEST BLOGS ====================

export const LATEST_BLOGS_QUERY = defineQuery(`
  *[_type == "blog" && isLatest == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    isLatest,
    blogcategories[]-> {
      _id,
      title,
      slug
    },
    author-> {
      _id,
      name,
      image,
      bio
    }
  }
`);

export const getLatestBlogs = async () => {
  try {
    const { data } = await sanityFetch({
      query: LATEST_BLOGS_QUERY,
    });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching latest blogs:", error);
    return [];
  }
};

// ==================== ALL BLOGS ====================

export const ALL_BLOGS_QUERY = defineQuery(`
  *[_type == "blog" && defined(slug.current)]
    | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      isLatest,
      blogcategories[]-> {
        _id,
        title,
        slug
      },
      author-> {
        _id,
        name,
        image
      }
    }
`);

export const getAllBlogs = async (quantity?: number) => {
  try {
    const query = quantity
      ? defineQuery(`*[_type == "blog" && defined(slug.current)] | order(publishedAt desc)[0...$quantity] {
          _id,
          title,
          slug,
          mainImage,
          publishedAt,
          isLatest,
          blogcategories[]-> { _id, title, slug },
          author-> { _id, name, image }
        }`)
      : ALL_BLOGS_QUERY;

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

// ==================== SINGLE BLOG ====================

export const SINGLE_BLOG_QUERY = defineQuery(`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    isLatest,
    mainImage,
    body,
    blogcategories[]-> {
      _id,
      title,
      slug
    },
    author-> {
      _id,
      name,
      image,
      bio
    }
  }
`);

export const getSingleBlog = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: SINGLE_BLOG_QUERY,
      params: { slug },
    });
    return data ?? null;
  } catch (error) {
    console.error(`Error fetching single blog with slug "${slug}":`, error);
    return null;
  }
};

// ==================== CATEGORIES ====================

export const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? defineQuery(`*[_type == 'category'] | order(name asc) [0...$quantity] {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`)
      : defineQuery(`*[_type == 'category'] | order(name asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`);

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

