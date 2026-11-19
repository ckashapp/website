import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { smoothEase, subtleTap } from "@/lib/motion";
import type { Blog } from "@/data/blogs";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));

type BlogCardProps = {
  post: Blog;
  index?: number;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.article
      transition={{ duration: 0.25, ease: smoothEase }}
      whileHover={{ y: -2 }}
      className="ui-surface group min-w-0 overflow-hidden"
    >
      <Link to={`/blog/${post.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#1a1a1a] sm:aspect-auto sm:h-60">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover grayscale transition [transition-duration:900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_35%,rgba(17,17,17,0.9)_100%)]" />
          <span className="absolute left-5 top-5 rounded-[4px] bg-black/60 px-3 py-1.5 text-[11px] font-sans tracking-[0.1em] text-white/80">
            {post.category}
          </span>
        </div>

        <div className="bg-[#111] p-6">
          <div className="flex items-center gap-3 text-xs text-white/45">
            <span>{formatDate(post.date)}</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span>{post.readTime} min read</span>
          </div>

          <h3 className="type-h4 mt-4 font-display text-white sm:min-h-[74px]">
            {post.title}
          </h3>
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/52">
            {post.excerpt}
          </p>

          <div className="mt-7 flex items-center justify-between border-t border-[color:var(--border-subtle)] pt-5 text-sm">
            <span className="text-white/48">{post.author}</span>
            <motion.span
              whileTap={subtleTap}
              transition={{ duration: 0.55, ease: smoothEase }}
              className="inline-flex items-center gap-2 font-medium text-white/78 transition-colors group-hover:text-white"
            >
              Read more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
