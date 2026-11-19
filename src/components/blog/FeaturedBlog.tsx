import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { liftHover, smoothEase, subtleTap } from "@/lib/motion";
import type { Blog } from "@/data/blogs";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));

export default function FeaturedBlog({ post }: { post: Blog }) {
  return (
    <section className="relative">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="section-tag mb-3">
            [ Featured ]
          </div>
          <h2 className="font-display text-xl font-medium tracking-tight text-bone md:text-2xl">
            Editor's pick
          </h2>
        </div>
      </div>

      <motion.article
        whileHover={{ y: -2 }}
        transition={{ duration: 0.25, ease: smoothEase }}
        className="ui-surface group min-w-0 overflow-hidden lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]"
      >
        <Link to={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-[#171717] lg:aspect-auto lg:min-h-[520px]">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover grayscale transition [transition-duration:1000ms] group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_32%,rgba(10,10,10,0.72)_100%)]" />
        </Link>

        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-bone/48">
              <span className="rounded-[4px] bg-white/8 px-3 py-1.5 font-sans tracking-[0.12em] text-bone/70">
                {post.category}
              </span>
              <span>{formatDate(post.date)}</span>
              <span>{post.readTime} min read</span>
            </div>

            <h3 className="type-h3 mt-6 font-display text-bone">
              {post.title}
            </h3>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ash md:text-lg">
              {post.excerpt}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-5 border-t border-[color:var(--border-subtle)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-bone/50">By {post.author}</span>
            <motion.div whileHover={liftHover} whileTap={subtleTap}>
              <Link
                to={`/blog/${post.slug}`}
                className="ui-text-link w-fit"
              >
                Read feature
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.article>
    </section>
  );
}
