import { motion } from "framer-motion";
import SectionWrapper from "../ck/SectionWrapper";
import CkButton from "../ck/CkButton";
import { Search } from "lucide-react";
import { subtleTap } from "@/lib/motion";
import { MotionElement } from "@/components/motion/MotionSection";

const apps = [
  { name: "Aurora", cat: "Finance", desc: "Yield on idle stablecoins" },
  { name: "Tide", cat: "Payments", desc: "Cross-border invoicing" },
  { name: "Forge", cat: "Tools", desc: "On-chain accounting" },
  { name: "Atlas", cat: "Finance", desc: "Stablecoin treasury" },
  { name: "Pixel", cat: "Games", desc: "Pay-to-play arcade" },
  { name: "Loop", cat: "Payments", desc: "Recurring subscriptions" },
];

const cats = ["All", "Finance", "Payments", "Tools", "Games"];

export default function DappSection() {
  return (
    <SectionWrapper
      id="dapps"
      eyebrow="Ecosystem"
      title="A network of apps, in one wallet."
      subtitle="Discover finance, payments, tools and games — built natively on Ckash."
    >
      <MotionElement role="content" className="mb-8" innerClassName="flex items-center justify-between gap-4 flex-wrap">
        <div className="ui-surface flex h-11 w-full max-w-sm items-center gap-2 px-4">
          <Search className="h-4 w-4 text-ash" />
          <input placeholder="Search apps..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-ash text-bone" />
        </div>
        <div className="ui-surface flex flex-wrap gap-1 p-1">
          {cats.map((c, i) => (
            <button key={c}
              className={`h-10 rounded-[4px] px-3.5 text-[13px] transition-colors duration-200 ${i === 0 ? "bg-bone text-ink" : "text-ash hover:text-bone"}`}>
              {c}
            </button>
          ))}
        </div>
      </MotionElement>

      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {apps.map((a, i) => (
          <MotionElement role="item" index={i} key={a.name}>
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={subtleTap}
            className="ui-surface cursor-pointer p-6 transition-colors [transition-duration:250ms] hover:!border-[color:var(--border-hover)] hover:!bg-ink-2"
          >
            <div className="mt-5 flex items-center justify-between">
              <h3 className="font-display text-base font-medium text-bone">{a.name}</h3>
              <span className="text-[11px] font-sans tracking-[0.12em] text-ash">{a.cat}</span>
            </div>
            <p className="mt-1 text-sm text-ash">{a.desc}</p>
          </motion.div>
          </MotionElement>
        ))}
      </div>

      <MotionElement role="cta" className="mt-10" innerClassName="flex justify-center">
        <CkButton variant="secondary">Submit your app</CkButton>
      </MotionElement>
    </SectionWrapper>
  );
}
