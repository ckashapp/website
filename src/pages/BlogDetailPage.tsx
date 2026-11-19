import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { blogs } from "@/data/blogs";
import {
  MotionElement,
  MotionHeading,
  MotionSection,
} from "@/components/motion/MotionSection";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = blogs.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="grain min-h-screen bg-ink text-bone">
        <Navbar />
        <MotionSection as="div" className="pb-24 pt-36">
          <div className="ui-surface mx-auto max-w-3xl p-8 text-center">
            <MotionHeading>
            <h1 className="font-display text-3xl font-medium md:text-4xl">Post not found</h1>
            </MotionHeading>
            <MotionElement role="copy">
            <p className="mt-3 text-ash">The article may have moved or the link is no longer active.</p>
            </MotionElement>
            <MotionElement role="cta">
            <Link
              to="/blog"
              className="ui-button ui-button-primary mt-7"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            </MotionElement>
          </div>
        </MotionSection>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogs
    .filter((item) => item.id !== post.id && item.category === post.category)
    .concat(blogs.filter((item) => item.id !== post.id && item.category !== post.category))
    .slice(0, 3);

  return (
    <div className="grain min-h-screen bg-ink text-bone">
      <Navbar />
      <main className="overflow-hidden">
        <MotionSection
          as="article"
          className="px-5 pb-16 pt-32 sm:px-6 md:px-10 md:pb-20 md:pt-40"
        >
          <div className="page-container max-w-5xl">
            <MotionElement role="cta">
              <Link
                to="/blog"
                className="ui-text-link"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </MotionElement>

            <header className="mt-10">
              <MotionElement role="eyebrow"><div className="flex flex-wrap items-center gap-3 text-sm text-bone/52">
                <span className="rounded-[4px] bg-white/8 px-3 py-1.5 font-sans text-[11px] tracking-[0.12em] text-bone/70">
                  {post.category}
                </span>
                <span>{post.author}</span>
                <span>{formatDate(post.date)}</span>
                <span>{post.readTime} min read</span>
              </div></MotionElement>
              <MotionHeading>
              <h1 className="type-h1 mt-6 font-display text-bone">
                {post.title}
              </h1>
              </MotionHeading>
              <MotionElement role="copy">
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-ash md:text-lg">
                {post.excerpt}
              </p>
              </MotionElement>
            </header>

            <MotionElement role="visual" className="ui-surface mt-10 overflow-hidden">
              <img src={post.image} alt={post.title} className="aspect-[16/10] h-auto w-full max-w-full object-cover grayscale md:aspect-auto md:h-[540px]" />
            </MotionElement>

            <MotionElement role="content" className="mx-auto mt-12 max-w-3xl space-y-7 text-base leading-[1.85] text-bone/72 md:text-lg">
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </MotionElement>
          </div>
        </MotionSection>

        <MotionSection
          className="pb-24"
        >
          <div className="page-container">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <MotionElement role="eyebrow"><div className="section-tag mb-3">
                  [ Related ]
                </div></MotionElement>
                <MotionHeading>
                <h2 className="type-h2 font-display text-bone">
                  Keep reading
                </h2>
                </MotionHeading>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((item, index) => (
                <MotionElement role="item" index={index} key={item.id}>
                  <BlogCard post={item} index={index} />
                </MotionElement>
              ))}
            </div>
          </div>
        </MotionSection>
      </main>
      <Footer />
    </div>
  );
}
