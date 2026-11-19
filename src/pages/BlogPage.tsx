import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import BlogCard from "@/components/blog/BlogCard";
import FeaturedBlog from "@/components/blog/FeaturedBlog";
import BlogSearchFilter, { type BlogSort } from "@/components/blog/BlogSearchFilter";
import { blogCategories, blogs } from "@/data/blogs";
import {
  MotionElement,
  MotionHeading,
  MotionSection,
} from "@/components/motion/MotionSection";

const sortBlogs = (sort: BlogSort) => {
  return [...blogs].sort((a, b) => {
    if (sort === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sort === "popular") return b.popularity - a.popularity;
    if (sort === "shortest") return a.readTime - b.readTime;
    if (sort === "longest") return b.readTime - a.readTime;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<BlogSort>("newest");
  const featuredPost = blogs[0];

  const visiblePosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return sortBlogs(sort).filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const searchable = `${post.title} ${post.category} ${post.author} ${post.excerpt}`.toLowerCase();
      const matchesSearch = query.length === 0 || searchable.includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [category, search, sort]);

  return (
    <div className="grain min-h-screen bg-ink text-bone">
      <Navbar />
      <main className="overflow-hidden">
        <MotionSection
          className="relative pb-16 pt-32 md:pb-20 md:pt-40"
        >
          <div className="page-container">
            <div className="max-w-4xl">
              <MotionElement role="eyebrow"><div className="section-tag">
                [ Ckash journal ]
              </div></MotionElement>
              <MotionHeading>
              <h1 className="type-h1 font-display text-bone">
                Explore our latest information.
              </h1>
              </MotionHeading>
              
            </div>

          </div>
        </MotionSection>

        <MotionSection
          className="pb-16 md:px-0"
        >
          <div className="page-container">
            <MotionElement role="visual"><FeaturedBlog post={featuredPost} /></MotionElement>
          </div>
        </MotionSection>

        <MotionSection className="pb-24">
          <div className="page-container">
            <div className="mb-6 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <MotionElement role="eyebrow"><div className="section-tag mb-3">
                  [ All posts ]
                </div></MotionElement>
                <MotionHeading>
                <h2 className="type-h2 font-display text-bone">
                  Browse the archive
                </h2>
                </MotionHeading>
              </div>
              {/* <p className="max-w-md text-sm leading-relaxed text-ash md:text-right">
                Search by topic, author, or category, then sort the reading list to match your pace.
              </p> */}
            </div>

            <MotionElement role="content">
              <BlogSearchFilter
                search={search}
                category={category}
                sort={sort}
                categories={blogCategories}
                onSearchChange={setSearch}
                onCategoryChange={setCategory}
                onSortChange={setSort}
              />
            </MotionElement>

            {visiblePosts.length > 0 ? (
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {visiblePosts.map((post, index) => (
                  <MotionElement role="item" index={index} key={post.id}>
                    <BlogCard post={post} index={index} />
                  </MotionElement>
                ))}
              </div>
            ) : (
              <MotionElement role="content">
              <motion.div className="ui-surface mt-8 px-6 py-14 text-center">
                <h3 className="font-display text-2xl font-medium text-bone md:text-3xl">No posts found</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ash">
                  Try a different keyword, switch category, or reset the filters to bring the archive back.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setSort("newest");
                  }}
                  className="ui-button ui-button-primary mt-7"
                >
                  Reset filters
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
              </MotionElement>
            )}
          </div>
        </MotionSection>
      </main>
      <Footer />
    </div>
  );
}
