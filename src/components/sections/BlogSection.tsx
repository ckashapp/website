import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { liftHover, subtleTap } from "@/lib/motion";
import {
  MotionElement,
  MotionHeading,
  MotionSection,
} from "@/components/motion/MotionSection";

const posts = [
  {
    slug: "moving-stablecoins-across-chains",
    tag: "Guide",
    title: "Moving stablecoins across chains without the usual friction",
    date: "May 05, 2026",
    author: "Ckash Labs",
    image:
      "https://res.cloudinary.com/durncdjje/image/upload/v1777976798/ChatGPT_Image_May_5_2026_11_09_45_AM_zrztxq.avif",
  },
  {
    slug: "local-fiat-payments-stablecoins-everyday",
    tag: "Payments",
    title: "How local fiat payments can make stablecoins feel everyday",
    date: "May 02, 2026",
    author: "Product Team",
    image:
      "https://res.cloudinary.com/durncdjje/image/upload/v1777976797/ChatGPT_Image_May_5_2026_11_12_13_AM_uvqzam.avif",
  },
  {
    slug: "low-fee-routing-wallet-adoption",
    tag: "Network",
    title: "Why low-fee routing matters for wallet adoption",
    date: "April 28, 2026",
    author: "Research",
    image:
      "https://res.cloudinary.com/durncdjje/image/upload/v1777976798/ChatGPT_Image_May_5_2026_11_18_46_AM_bb8pat.avif",
  },
];

export default function BlogSection() {
  return (
    <MotionSection
      id="blog"
      backgroundClassName="bg-[#D3D3D3]"
      className="
        relative
        flex
        min-h-auto
        items-start
        py-20
        text-[#111]
        md:min-h-screen
        md:items-center
        md:py-28
      "
    >
      <div className="page-container">
        <div
          className="
            mb-8
            flex
            flex-col
            items-start
            justify-between
            gap-5
            md:mb-10
            md:flex-row
            md:items-end
          "
        >
          <div className="w-full max-w-3xl">
            <MotionElement role="eyebrow"><div className="section-tag justify-start !text-black/55">
              [ Blog ]
            </div></MotionElement>

            <MotionHeading>
            <h2 className="type-h2 font-display text-[#111]">
              Notes on stablecoins, payments, and wallet UX.
            </h2>
            </MotionHeading>

            <MotionElement role="copy">
            <p className="section-subtitle !text-black/65">
              Product thinking, guides, and ecosystem updates from Ckash.
            </p>
            </MotionElement>
          </div>

          <MotionElement role="cta">
          <motion.div whileHover={liftHover} whileTap={subtleTap}>
            <Link
              to="/blog"
              className="ui-text-link w-fit !text-[#111] hover:!text-[#333]"
            >
              Read all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          </MotionElement>
        </div>

        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <MotionElement role="item" index={index} key={post.title}>
            <motion.article
              whileHover={{ y: -2 }}
              className="
                group
                w-full
                overflow-hidden
                rounded-[6px]
                border
                border-[color:var(--border-default)]
                bg-[#111]
              "
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
              >
                <div className="relative h-48 overflow-hidden bg-[#1a1a1a] xs:h-52 sm:h-56">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="
                      block
                      h-full
                      w-full
                      object-cover
                      grayscale
                      transition
                      [transition-duration:900ms]
                      [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
                      group-hover:scale-105
                      group-hover:grayscale-0
                    "
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_35%,rgba(17,17,17,0.85)_100%)]" />

                  <span className="absolute left-4 top-4 rounded-[4px] bg-black/60 px-3 py-1.5 text-[11px] font-sans tracking-[0.1em] text-white/80 sm:left-5 sm:top-5">
                    {post.tag}
                  </span>
                </div>

                <div className="bg-[#111] p-5 sm:p-6">
                  <h3 className="type-h4 font-display text-white">
                    {post.title}
                  </h3>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--border-subtle)] pt-5 text-xs text-white/50 sm:text-sm md:mt-8">
                    <span>{post.date}</span>
                    <span>{post.author}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
            </MotionElement>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
